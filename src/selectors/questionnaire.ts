import * as R from 'ramda';
import { Store } from '../stores';
import * as model from '../stores/questionnaire';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from '../stores/taxonomies';

export type Questionnaire = ReadonlyArray<Question>;

export interface Question {
    readonly id: model.Id;
    readonly number: number;
    readonly text: string;
    readonly explanation?: string;
    readonly answers: ReadonlyArray<Answer>;
}

export interface Answer {
    readonly id: model.Id;
    readonly text: string;
    readonly isSelected: boolean;
    readonly acceptMultipleAnswers: boolean;
}

export const selectQuestionnaire = (appStore: Store): Questionnaire => {
    const locale = selectLocale(appStore);
    return denormalizeQuestions(locale, appStore.questionnaireInStore);
};

export const denormalizeQuestions = (locale: Locale, modelStore: model.Store): Questionnaire => {
    const { questions, answers }: model.Store = modelStore;

    return Object.keys(questions).map((key: string, index: number) => {
        const question: model.Question = questions[key];
        return {
            id: question.id,
            number: index + 1,
            text: selectLocalizedText(locale, question.text),
            explanation: question.explanation ? selectLocalizedText(locale, question.explanation) : undefined,
            answers: selectAnswersForQuestion(locale, question, answers),
        };
    });
};

const selectAnswersForQuestion = (locale: Locale, question: model.Question, answers: model.AnswersMap): ReadonlyArray<Answer> => {
    const keys = answerKeysForGivenQuestion(question.id, answers);

    return buildViewModelForAnswers(locale, keys, answers, question.acceptMultipleAnswers);
};

const answerKeysForGivenQuestion = (questionId: model.Id, answers: model.AnswersMap): ReadonlyArray<string> => {
    return Object.keys(answers).filter((key: string) => (
        answers[key].questionId === questionId
    ));
};

const buildViewModelForAnswers = (locale: Locale, keys: ReadonlyArray<string>,
    answers: model.AnswersMap, acceptMultipleAnswers: boolean): ReadonlyArray<Answer> => (
        keys.map((key: string) => {
            const { id, text, isSelected }: model.Answer = answers[key];
            return {
                id,
                text: selectLocalizedText(locale, text),
                isSelected,
                acceptMultipleAnswers,
            };
        })
    );

export const selectTaxonomyTermsForSelectedAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    filterTaxonomyTermsForSelectedAnswers(store.questionnaireInStore.answers)
);

export const filterTaxonomyTermsForSelectedAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => {
    type ReferenceArray = ReadonlyArray<TaxonomyTermReference>;
    const flatten = R.reduce((acc: ReferenceArray, val: ReferenceArray): ReferenceArray => [...acc, ...val], []);

    return flatten(R.pluck('taxonomyTerms', R.filter(R.propEq('isSelected', true), R.values(answers))));
};

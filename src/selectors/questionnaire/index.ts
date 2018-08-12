import * as R from 'ramda';
import { Store } from '../../stores';
import * as model from '../../stores/questionnaire';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { TaxonomyTermReference } from '../../stores/taxonomies';
import { toValidOrThrow } from '../../stores/questionnaire/stores';

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
    readonly isChosen: boolean;
    readonly acceptMultipleAnswers: boolean;
}

export const denormalizeQuestions = (locale: Locale, modelStore: model.Store): Questionnaire => {
    const { questions, answers }: model.ValidStore = toValidOrThrow(modelStore);

    return Object.keys(questions).map((key: string, index: number) => {
        const question: model.Question = questions[key];
        return {
            id: question.id,
            number: index + 1,
            text: getLocalizedText(locale, question.text),
            explanation: question.explanation ? getLocalizedText(locale, question.explanation) : undefined,
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
            const { id, text, isChosen }: model.Answer = answers[key];
            return {
                id,
                text: getLocalizedText(locale, text),
                isChosen,
                acceptMultipleAnswers,
            };
        })
    );

export const selectTaxonomyTermsForSelectedAnswers = (store: Store): ReadonlyArray<TaxonomyTermReference> => (
    filterTaxonomyTermsForChosenAnswers(toValidOrThrow(store.questionnaireInStore).answers)
);

export const filterTaxonomyTermsForChosenAnswers = (answers: model.AnswersMap): ReadonlyArray<TaxonomyTermReference> => {
    type ReferenceArray = ReadonlyArray<TaxonomyTermReference>;
    const flatten = R.reduce((acc: ReferenceArray, val: ReferenceArray): ReferenceArray => [...acc, ...val], []);

    return flatten(R.pluck('taxonomyTerms', R.filter(R.propEq('isChosen', true), R.values(answers))));
};

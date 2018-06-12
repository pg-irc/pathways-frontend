import * as model from '../stores/questionnaire';
import * as app from '../application/store';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';

export type Questionnaire = ReadonlyArray<Question>;

export interface Question {
    readonly id: model.Id;
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

export const selectQuestionnaire = (appStore: app.Store): Questionnaire => {
    const locale = selectLocale(appStore);
    return denormalizeQuestions(locale, appStore.applicationState.questionnaireInStore);
};

export const denormalizeQuestions = (locale: Locale, modelStore: model.Store): Questionnaire => {
    const { questions, answers }: model.Store = modelStore;

    return Object.keys(questions).map((key: string) => {
        const question: model.Question = questions[key];
        return question.explanation ?
            {
                id: question.id,
                text: selectLocalizedText(locale, question.text),
                explanation: selectLocalizedText(locale, question.explanation),
                answers: selectAnswersForQuestion(locale, question, answers),
            }
            :
            {
                id: question.id,
                text: selectLocalizedText(locale, question.text),
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

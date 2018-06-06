import * as model from '../stores/questionnaire';
import * as app from '../application/store';
import { Locale } from '../application/locale';
import { selectLocalizedText } from './locale';

export type Questionnaire = ReadonlyArray<LocalizedQuestion>;

export interface LocalizedQuestion {
    readonly id: model.Id;
    readonly text: string;
    readonly answers: ReadonlyArray<LocalizedAnswer>;
}

export interface LocalizedAnswer {
    readonly id: model.Id;
    readonly text: string;
    readonly isSelected: boolean;
}

export const selectQuestionnaire = (locale: Locale, appStore: app.Store): Questionnaire => (
    denormalizeQuestions(locale, appStore.applicationState.questionnaireInStore)
);

export const denormalizeQuestions = (locale: Locale, modelStore: model.Store): Questionnaire => {
    const { questions, answers }: model.Store = modelStore;

    return Object.keys(questions).map((key: string) => {
        const { id, text }: model.Question = questions[key];
        return {
            id,
            text: selectLocalizedText(locale, text),
            answers: selectAnswersForQuestion(locale, id, answers),
        };
    });
};

const selectAnswersForQuestion = (locale: Locale, questionId: model.Id, answers: model.AnswersMap): ReadonlyArray<LocalizedAnswer> => {
    const keys = answerKeysForGivenQuestion(questionId, answers);

    return buildViewModelForAnswers(locale, keys, answers);
};

const answerKeysForGivenQuestion = (questionId: model.Id, answers: model.AnswersMap): ReadonlyArray<string> => {
    return Object.keys(answers).filter((key: string) => (
        answers[key].questionId === questionId
    ));
};

const buildViewModelForAnswers = (locale: Locale, keys: ReadonlyArray<string>, answers: model.AnswersMap): ReadonlyArray<LocalizedAnswer> => (
    keys.map((key: string) => {
        const { id, text, isSelected }: model.Answer = answers[key];
        return {
            id,
            text: selectLocalizedText(locale, text),
            isSelected,
        };
    })
);

import * as model from '../../stores/questionnaire';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { toValidOrThrow } from '../../stores/questionnaire/stores';
import { Questionnaire, Answer } from '.';

export const buildQuestionnaire = (locale: Locale, modelStore: model.Store): Questionnaire => {
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

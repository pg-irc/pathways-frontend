import * as model from '../../stores/questionnaire';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { toValidOrThrow } from '../../stores/questionnaire/stores';
import { Question } from './question';
import { toSelectorAnswerListForQuestion } from './to_selector_answer_list_for_question';

export const toSelectorQuestionList = (locale: Locale, modelStore: model.QuestionnaireStore): ReadonlyArray<Question> => {
    const { questions, answers }: model.ValidQuestionnaireStore = toValidOrThrow(modelStore);

    return Object.keys(questions).map((key: string, index: number) => {
        const question: model.Question = questions[key];
        return {
            id: question.id,
            number: index + 1,
            text: getLocalizedText(locale, question.text),
            explanation: question.explanation ? getLocalizedText(locale, question.explanation) : undefined,
            answers: toSelectorAnswerListForQuestion(locale, question, answers),
        };
    });
};

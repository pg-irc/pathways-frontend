import * as R from 'ramda';
import * as model from '../../stores/questionnaire';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { Question } from './question';
import { toSelectorAnswerListForQuestion } from './to_selector_answer_list_for_question';

export const toSelectorQuestion = (locale: Locale, question: model.Question, questions: model.QuestionsMap, answers: model.AnswersMap): Question => {
    const questionsList = R.values(questions);
    const questionIndex = R.findIndex(R.propEq('id', question.id), questionsList);
    const nextQuestionIndex = questionIndex + 1;
    const previousQuestionIndex = questionIndex - 1;
    return {
        id: question.id,
        text: getLocalizedText(locale, question.text),
        explanation: question.explanation ? getLocalizedText(locale, question.explanation) : undefined,
        answers: toSelectorAnswerListForQuestion(locale, question, answers),
        positionInQuestionnaire: nextQuestionIndex,
        lengthOfQuestionnaire: questionsList.length,
        nextQuestionId: nextQuestionIndex < questionsList.length ? questionsList[nextQuestionIndex].id : undefined,
        previousQuestionId: previousQuestionIndex >= 0 ? questionsList[previousQuestionIndex].id : undefined,
    };
};

import * as R from 'ramda';
import * as model from '../../stores/questionnaire';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { Question } from './question';
import { toSelectorAnswerListForQuestion } from './to_selector_answer_list_for_question';

export const toSelectorQuestion = (locale: Locale, question: model.Question, questions: model.QuestionsMap, answers: model.AnswersMap): Question => {
    const questionsList = R.values(questions);
    const questionIndex = R.findIndex(R.propEq('id', question.id), questionsList);
    return {
        id: question.id,
        text: getLocalizedText(locale, question.text),
        explanation: question.explanation ? getLocalizedText(locale, question.explanation) : undefined,
        answers: toSelectorAnswerListForQuestion(locale, question, answers),
        positionInQuestionnaire: questionIndex + 1,
        lengthOfQuestionnaire: questionsList.length,
        nextQuestionId: questionsList[questionIndex + 1] ? questionsList[questionIndex + 1].id : undefined,
        previousQuestionId: questionsList[questionIndex - 1] ? questionsList[questionIndex - 1].id : undefined,
    };
};

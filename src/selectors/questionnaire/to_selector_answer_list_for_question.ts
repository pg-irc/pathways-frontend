import * as model from '../../stores/questionnaire';
import { Answer } from './answer';
import { toSelectorAnswerList } from './to_selector_answer_list';
import { filterAnswerIdsToGivenQuestion } from './filter_answer_ids_to_given_question';

export const toSelectorAnswerListForQuestion = (question: model.Question, answers: model.AnswersMap): ReadonlyArray<Answer> => {
    const keys = filterAnswerIdsToGivenQuestion(question.id, answers);

    return toSelectorAnswerList(keys, answers, question.acceptMultipleAnswers);
};

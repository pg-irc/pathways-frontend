import * as model from '../../stores/questionnaire';
import { Locale } from '../../locale/types';
import { Answer } from './types';
import { toSelectorAnswerList } from './to_selector_answer_list';
import { filterAnswerIdsToGivenQuestion } from './filter_answer_ids_to_given_question';

export const toSelectorAnswerListForQuestion = (locale: Locale, question: model.Question, answers: model.AnswersMap): ReadonlyArray<Answer> => {
    const keys = filterAnswerIdsToGivenQuestion(question.id, answers);

    return toSelectorAnswerList(locale, keys, answers, question.acceptMultipleAnswers);
};

import { Id, AnswersMap } from '../../stores/questionnaire';
import { filterChosenAnswers } from './filter_chosen_answers';
import { getAnswerIds } from './get_answer_ids';

export const getIdsOfChosenAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    getAnswerIds(filterChosenAnswers(answers))
);

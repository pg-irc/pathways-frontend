import { Id, AnswersMap } from '../../stores/questionnaire';
import { filterChosenAnswers } from './filter_chosen_answers';
import { getIdsFromAnswerMap } from './get_ids_from_answer_map';

export const getIdsOfChosenAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    getIdsFromAnswerMap(filterChosenAnswers(answers))
);

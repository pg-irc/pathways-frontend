import { Id, AnswersMap } from '../../stores/questionnaire';
import { isChosen } from './is_chosen';
import { getIdFromAnswer } from './get_id_from_answer';
import * as R from 'ramda';

export const getIdsOfChosenAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map(getIdFromAnswer, R.filter(isChosen, R.values(answers)))
);

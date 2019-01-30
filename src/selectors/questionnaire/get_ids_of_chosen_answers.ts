import { Id, AnswersMap } from '../../stores/questionnaire';
import { isEitherChosenOrInverted } from './is_either_chosen_or_inverted';
import { getIdFromAnswer } from './get_id_from_answer';
import * as R from 'ramda';

export const getIdsOfChosenAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map(getIdFromAnswer, R.filter(isEitherChosenOrInverted, R.values(answers)))
);

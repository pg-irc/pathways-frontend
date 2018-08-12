import { Id, AnswersMap } from '../../stores/questionnaire';
import * as R from 'ramda';
import { filterChosenAnswers } from './filter_chosen_answers';

export const getIdsOfChosenAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    getAnswerIds(filterChosenAnswers(answers))
);

const getAnswerIds = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map(R.prop('id'), R.values(answers))
);

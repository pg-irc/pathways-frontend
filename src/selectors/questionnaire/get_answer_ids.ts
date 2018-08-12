import { Id, AnswersMap } from '../../stores/questionnaire';
import * as R from 'ramda';

export const getAnswerIds = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map(R.prop('id'), R.values(answers))
);

import { Id, Answer, AnswersMap } from '../../stores/questionnaire';
import * as R from 'ramda';

export const getIdsFromAnswerMap = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map<Answer, Id>(R.prop('id'), R.values(answers))
);

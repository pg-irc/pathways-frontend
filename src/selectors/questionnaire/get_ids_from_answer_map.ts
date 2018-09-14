import { Id, Answer, AnswersMap } from '../../stores/questionnaire';
import * as R from 'ramda';

export const getIdsFromAnswerMap = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map((answer: Answer) => answer.id, R.values(answers))
);

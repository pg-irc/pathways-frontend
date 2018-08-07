import { Store } from '../stores';
import { Id, AnswersMap } from '../stores/questionnaire';
import * as R from 'ramda';

export const selectIdsOfActiveQuestions = (appStore: Store): ReadonlyArray<Id> => (
    getIdsOfActiveAnswers(appStore.questionnaireInStore.answers)
);

export const getIdsOfActiveAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    getIds(filterSelectedAnswers(answers))
);

const getIds = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map(R.prop('id'), R.values(answers))
);

const filterSelectedAnswers = (answers: AnswersMap): AnswersMap => (
    R.filter(R.propEq('isSelected', true), answers)
);

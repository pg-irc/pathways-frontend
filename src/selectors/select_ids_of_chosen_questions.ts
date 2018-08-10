import { Store } from '../stores';
import { Id, AnswersMap } from '../stores/questionnaire';
import { toValidOrThrow, ValidStore as QuestionnaireStore } from '../stores/questionnaire/stores';
import * as R from 'ramda';

export const selectIdsOfChosenAnswers = (appStore: Store): ReadonlyArray<Id> => (
    getIdsOfChosenAnswers(pickQuestionnaire(appStore).answers)
);

const pickQuestionnaire = (appStore: Store): QuestionnaireStore => (
    toValidOrThrow(appStore.questionnaireInStore)
);

export const getIdsOfChosenAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    getIds(filterChosenAnswers(answers))
);

const getIds = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map(R.prop('id'), R.values(answers))
);

const filterChosenAnswers = (answers: AnswersMap): AnswersMap => (
    R.filter(R.propEq('isChosen', true), answers)
);

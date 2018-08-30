import { Store } from '../../stores';
import { Id } from '../../stores/questionnaire';
import { getIdsOfChosenAnswers } from './get_ids_of_chosen_answers';
import { pullQuestionnaire } from './pull_questionnaire';

export const selectUserDataForLocalPersistence = (appStore: Store): ReadonlyArray<Id> => (
    getIdsOfChosenAnswers(pullQuestionnaire(appStore).answers)
);

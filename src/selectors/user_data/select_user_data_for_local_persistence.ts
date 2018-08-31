import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { pullQuestionnaire } from '../questionnaire/pull_questionnaire';
import { PersistedUserData } from '../../stores/user_data';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedUserData => ({
    chosenAnswers: getIdsOfChosenAnswers(pullQuestionnaire(appStore).answers),
    savedTasks: [],
});

// TODO move to a UserData folder and rename to match function name

import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { pullQuestionnaire } from '../questionnaire/pull_questionnaire';
import { PersistedUserData } from '../user_data/persisted_user_data';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedUserData => ({
    chosenAnswers: getIdsOfChosenAnswers(pullQuestionnaire(appStore).answers),
    savedTasks: [],
});

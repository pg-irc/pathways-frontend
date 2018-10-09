import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { pickQuestionnaire } from '../questionnaire/pick_questionnaire';
import { PersistedUserData } from '../../stores/user_data';
import { pickSavedTaskIds } from '../tasks/pick_saved_task_ids';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedUserData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickQuestionnaire(appStore).answers),
    savedTasks: pickSavedTaskIds(appStore),
});

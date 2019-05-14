import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { PersistedUserData } from '../../stores/user_data';
import { pickSavedTaskIds } from '../topics/pick_saved_task_ids';
import { pickAnswers } from '../questionnaire/pick_answers';
import { pickTasks } from '../topics/pick_tasks';
import { getIdsOfCompletedTasks } from '../topics/get_ids_of_completed_tasks';
import { selectShowOnboarding } from '../onboarding/select_show_onboarding';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedUserData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    savedTasks: pickSavedTaskIds(appStore),
    completedTasks: getIdsOfCompletedTasks(pickTasks(appStore)),
    showOnboarding: selectShowOnboarding(appStore),
});

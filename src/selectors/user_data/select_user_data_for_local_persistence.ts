import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { PersistedUserData } from '../../stores/user_data';
import { pickSavedTopicIds } from '../topics/pick_saved_topic_ids';
import { pickAnswers } from '../questionnaire/pick_answers';
import { pickTopics } from '../topics/pick_topics';
import { getIdsOfCompletedTopics } from '../topics/get_ids_of_completed_topics';
import { selectShowOnboarding } from '../onboarding/select_show_onboarding';
import { getSavedServicesMap } from '../services/pick_saved_services';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedUserData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    savedTopics: pickSavedTopicIds(appStore),
    completedTopics: getIdsOfCompletedTopics(pickTopics(appStore)),
    showOnboarding: selectShowOnboarding(appStore),
    savedServices: getSavedServicesMap(appStore),
});

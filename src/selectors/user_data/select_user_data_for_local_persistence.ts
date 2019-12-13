import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { PersistedUserData } from '../../stores/user_data';
import { pickBookmarkedTopicIds } from '../topics/pick_bookmarked_topic_ids';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectShowOnboarding } from '../onboarding/select_show_onboarding';
import { selectBookmarkedServiceMap } from '../services/select_bookmarked_service_map';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedUserData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    bookmarkedTopics: pickBookmarkedTopicIds(appStore),
    showOnboarding: selectShowOnboarding(appStore),
    bookmarkedServices: selectBookmarkedServiceMap(appStore),
});

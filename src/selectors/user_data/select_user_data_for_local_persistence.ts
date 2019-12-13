import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { pickBookmarkedTopicIds } from '../topics/pick_bookmarked_topic_ids';
import { PersistedData } from '../../stores/persisted_data';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectShowOnboarding } from '../user_profile/select_show_onboarding';
import { selectDisableAnalytics } from '../user_profile/select_disable_analytics';
import { selectBookmarkedServiceMap } from '../services/select_bookmarked_service_map';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    bookmarkedTopics: pickBookmarkedTopicIds(appStore),
    showOnboarding: selectShowOnboarding(appStore),
    bookmarkedServices: selectBookmarkedServiceMap(appStore),
    disableAnalytics: selectDisableAnalytics(appStore),
});

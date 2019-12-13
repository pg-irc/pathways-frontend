import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { pickBookmarkedTopicIds } from '../topics/pick_bookmarked_topic_ids';
import { PersistedData } from '../../stores/persisted_data';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectBookmarkedServiceMap } from '../services/select_bookmarked_service_map';
import { selectShowOnboarding, selectDisableAnalytics } from '../onboarding/select_show_onboarding';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    bookmarkedTopics: pickBookmarkedTopicIds(appStore),
    showOnboarding: selectShowOnboarding(appStore),
    bookmarkedServices: selectBookmarkedServiceMap(appStore),
    disableAnalytics: selectDisableAnalytics(appStore),
});

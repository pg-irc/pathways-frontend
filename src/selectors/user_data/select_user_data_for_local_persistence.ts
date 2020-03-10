import { Store } from '../../stores';
import { getIdsOfChosenAnswers } from '../questionnaire/get_ids_of_chosen_answers';
import { pickBookmarkedTopicIds } from '../topics/pick_bookmarked_topic_ids';
import { PersistedData } from '../../stores/persisted_data';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectShowOnboarding } from '../user_profile/select_show_onboarding';
import { selectDisableAnalytics } from '../user_profile/select_disable_analytics';
import { selectBookmarkedServiceMap } from '../services/select_bookmarked_service_map';
import { selectSearchTerm } from '../search/select_search_term';
import { selectSearchLocation } from '../search/select_search_location';
import { selectShowPartialLocalizationMessage } from '../user_profile/select_show_partial_localization_message';
import { selectIsInputCollapsed } from '../search/select_is_input_collapsed';
import { selectSearchResults } from '../search/select_search_results';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    bookmarkedTopics: pickBookmarkedTopicIds(appStore),
    showOnboarding: selectShowOnboarding(appStore),
    bookmarkedServices: selectBookmarkedServiceMap(appStore),
    disableAnalytics: selectDisableAnalytics(appStore),
    searchTerm: selectSearchTerm(appStore),
    searchLocation: selectSearchLocation(appStore),
    searchResults: selectSearchResults(appStore),
    isSearchInputCollapsed: selectIsInputCollapsed(appStore),
    showPartialLocalizationMessage: selectShowPartialLocalizationMessage(appStore),
});

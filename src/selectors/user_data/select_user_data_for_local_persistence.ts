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
import { selectSearchLatLong } from '../search/select_search_lat_long';
import { selectSearchPage } from '../search/select_search_page';
import { selectNumberOfSearchPages } from '../search/select_number_of_search_pages';
import { selectSearchOffset } from '../search/select_search_offset';
import { selectShowLinkAlerts } from '../user_profile/select_show_link_alerts';

export const selectUserDataForLocalPersistence = (appStore: Store): PersistedData => ({
    chosenAnswers: getIdsOfChosenAnswers(pickAnswers(appStore)),
    bookmarkedTopics: pickBookmarkedTopicIds(appStore),
    showOnboarding: selectShowOnboarding(appStore),
    bookmarkedServices: selectBookmarkedServiceMap(appStore),
    disableAnalytics: selectDisableAnalytics(appStore),
    showLinkAlerts: selectShowLinkAlerts(appStore),
    searchTerm: selectSearchTerm(appStore),
    searchLocation: selectSearchLocation(appStore),
    searchLatLong: selectSearchLatLong(appStore),
    searchPage: selectSearchPage(appStore),
    searchOffset: selectSearchOffset(appStore),
    numberOfSearchPages: selectNumberOfSearchPages(appStore),
    searchResults: selectSearchResults(appStore),
    collapseSearchInput: selectIsInputCollapsed(appStore),
    showPartialLocalizationMessage: selectShowPartialLocalizationMessage(appStore),
});

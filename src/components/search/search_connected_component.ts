import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import * as serviceActions from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { disableAnalytics, DisableAnalyticsAction, EnableCustomLatLongAction, enableCustomLatLong } from '../../stores/user_profile';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import * as searchActions from '../../stores/search';
import { SearchExecutedAction, searchExecuted } from '../../stores/analytics';
import { selectSearchTerm } from '../../selectors/search/select_search_term';
import { selectSearchLocation } from '../../selectors/search/select_search_location';
import { selectSearchLatLong } from '../../selectors/search/select_search_lat_long';
import { selectSearchPage } from '../../selectors/search/select_search_page';
import { selectNumberOfSearchPages } from '../../selectors/search/select_number_of_search_pages';
import { selectIsInputCollapsed } from '../../selectors/search/select_is_input_collapsed';
import { selectSearchResults } from '../../selectors/search/select_search_results';
import { SearchServiceData } from '../../validation/search/types';
import { LatLong } from '../../validation/latlong/types';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/user_experience/actions';
import { selectCustomLatLong } from '../../selectors/user_profile/select_custom_latlong';
import { selectReviewedServicesIds } from '../../selectors/services/select_reviewed_services_ids';
import { selectIsSendingReview } from '../../selectors/reviews/select_is_sending_review';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    reviewedServicesIds: selectReviewedServicesIds(store),
    searchTerm: selectSearchTerm(store),
    searchLocation: selectSearchLocation(store),
    searchPage: selectSearchPage(store),
    numberOfSearchPages: selectNumberOfSearchPages(store),
    searchResults: selectSearchResults(store),
    searchLatLong: selectSearchLatLong(store),
    collapseSearchInput: selectIsInputCollapsed(store),
    customLatLong: selectCustomLatLong(store),
    isSendingReview: selectIsSendingReview(store),
});

type Actions =
    serviceActions.SaveServiceToMapAction |
    serviceActions.OpenServiceAction |
    DisableAnalyticsAction |
    EnableCustomLatLongAction |
    serviceActions.BookmarkServiceAction |
    serviceActions.UnbookmarkServiceAction |
    searchActions.SaveSearchTermAction |
    searchActions.SaveSearchLocationAction |
    searchActions.SaveSearchLatLongAction |
    searchActions.SaveSearchPageAction |
    searchActions.SaveNumberOfSearchPagesAction |
    searchActions.SaveSearchResultsAction |
    searchActions.SetCollapseSearchInputAction |
    SearchExecutedAction |
    OpenHeaderMenuAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): SearchComponentActions => ({
    saveServiceToMap: (service: HumanServiceData): serviceActions.SaveServiceToMapAction => (
        dispatch(serviceActions.saveServiceToMap(service))
    ),
    openServiceDetail: (service: HumanServiceData): serviceActions.OpenServiceAction => (
        dispatch(serviceActions.openServiceDetail(service))
    ),
    disableAnalytics: (disable: boolean): DisableAnalyticsAction => (
        dispatch(disableAnalytics(disable))
    ),
    enableCustomLatLong: (customLatLong: LatLong): EnableCustomLatLongAction => (
        dispatch(enableCustomLatLong(customLatLong))
    ),
    bookmarkService: (service: HumanServiceData): serviceActions.BookmarkServiceAction => (
        dispatch(serviceActions.bookmarkService(service))
    ),
    unbookmarkService: (service: HumanServiceData): serviceActions.UnbookmarkServiceAction => (
        dispatch(serviceActions.unbookmarkService(service))
    ),
    saveSearchTerm: (searchTerm: string): searchActions.SaveSearchTermAction => (
        dispatch(searchActions.saveSearchTerm(searchTerm))
    ),
    saveSearchLocation: (searchLocation: string): searchActions.SaveSearchLocationAction => (
        dispatch(searchActions.saveSearchLocation(searchLocation))
    ),
    saveSearchLatLong: (searchLatLong: LatLong): searchActions.SaveSearchLatLongAction => (
        dispatch(searchActions.saveSearchLatLong(searchLatLong))
    ),
    saveSearchPage: (searchPage: number): searchActions.SaveSearchPageAction => (
        dispatch(searchActions.saveSearchPage(searchPage))
    ),
    saveNumberOfSearchPages: (numberOfSearchPages: number): searchActions.SaveNumberOfSearchPagesAction => (
        dispatch(searchActions.saveNumberOfSearchPages(numberOfSearchPages))
    ),
    saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>): searchActions.SaveSearchResultsAction => (
        dispatch(searchActions.saveSearchResults(searchResults))
    ),
    setCollapseSearchInput: (collapseSearchInput: boolean): searchActions.SetCollapseSearchInputAction => (
        dispatch(searchActions.setCollapseSearchInput(collapseSearchInput))
    ),
    searchExecuted: (searchTerm: string, searchLocation: string): SearchExecutedAction => (
        dispatch(searchExecuted(searchTerm, searchLocation))
    ),
    openHeaderMenu: (): OpenHeaderMenuAction => (
        dispatch(openHeaderMenu())
    ),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);

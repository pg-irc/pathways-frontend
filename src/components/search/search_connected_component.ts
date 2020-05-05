import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import * as serviceActions from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { disableAnalytics, DisableAnalyticsAction } from '../../stores/user_profile';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import * as searchActions from '../../stores/search';
import { selectSearchTerm } from '../../selectors/search/select_search_term';
import { selectSearchLocation } from '../../selectors/search/select_search_location';
import { selectSearchLatLong } from '../../selectors/search/select_search_lat_long';
import { selectSearchPage } from '../../selectors/search/select_search_page';
import { selectNumberOfSearchPages } from '../../selectors/search/select_number_of_search_pages';
import { selectSearchOffset } from '../../selectors/search/select_search_offset';
import { selectIsInputCollapsed } from '../../selectors/search/select_is_input_collapsed';
import { selectSearchResults } from '../../selectors/search/select_search_results';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    searchTerm: selectSearchTerm(store),
    searchLocation: selectSearchLocation(store),
    searchPage: selectSearchPage(store),
    numberOfSearchPages: selectNumberOfSearchPages(store),
    searchOffset: selectSearchOffset(store),
    searchResults: selectSearchResults(store),
    searchLatLong: selectSearchLatLong(store),
    collapseSearchInput: selectIsInputCollapsed(store),
});

type Actions =
    serviceActions.SaveServiceAction |
    serviceActions.OpenServiceAction |
    DisableAnalyticsAction |
    serviceActions.BookmarkServiceAction |
    serviceActions.UnbookmarkServiceAction |
    searchActions.SaveSearchTermAction |
    searchActions.SaveSearchLocationAction |
    searchActions.SaveSearchLatLongAction |
    searchActions.SaveSearchOffsetAction |
    searchActions.SetCollapseSearchInputAction |
    searchActions.SearchRequestAction |
    searchActions.LoadMoreRequestAction |
    OpenHeaderMenuAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): SearchComponentActions => ({
    saveService: (service: HumanServiceData): serviceActions.SaveServiceAction => (
        dispatch(serviceActions.saveService(service))
    ),
    openServiceDetail: (service: HumanServiceData): serviceActions.OpenServiceAction => (
        dispatch(serviceActions.openServiceDetail(service))
    ),
    disableAnalytics: (disable: boolean): DisableAnalyticsAction => (
        dispatch(disableAnalytics(disable))
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
    saveSearchOffset: (searchOffset: number): searchActions.SaveSearchOffsetAction => (
        dispatch(searchActions.saveSearchOffset(searchOffset))
    ),
    setCollapseSearchInput: (collapseSearchInput: boolean): searchActions.SetCollapseSearchInputAction => (
        dispatch(searchActions.setCollapseSearchInput(collapseSearchInput))
    ),
    searchRequest: (searchTermInput: string, searchLocationInput: string): searchActions.SearchRequestAction => (
        dispatch(searchActions.searchRequest(searchTermInput, searchLocationInput))
    ),
    loadMoreRequestAction: (): searchActions.LoadMoreRequestAction => (
        dispatch(searchActions.loadMoreRequest())
    ),
    openHeaderMenu: (): OpenHeaderMenuAction => (
        dispatch(openHeaderMenu())
    ),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);

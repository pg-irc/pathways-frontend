import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { saveService, SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService, OpenServiceAction, openService } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { disableAnalytics, DisableAnalyticsAction } from '../../stores/user_profile';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import {
    SaveSearchTermAction, SaveSearchLocationAction, SetCollapseSearchInputAction,
    saveSearchLocation, saveSearchTerm, setCollapseSearchInput, SaveSearchResultsAction, saveSearchResults,
    SaveSearchLatLongAction, saveSearchLatLong, SaveSearchPageAction, saveSearchPage, SaveNumberOfSearchPagesAction, saveNumberOfSearchPages,
} from '../../stores/search';
import { SearchQueriedAction, searchQueried } from '../../stores/analytics';
import { selectSearchTerm } from '../../selectors/search/select_search_term';
import { selectSearchLocation } from '../../selectors/search/select_search_location';
import { selectSearchLatLong } from '../../selectors/search/select_search_lat_long';
import { selectSearchPage } from '../../selectors/search/select_search_page';
import { selectNumberOfSearchPages } from '../../selectors/search/select_number_of_search_pages';
import { selectIsInputCollapsed } from '../../selectors/search/select_is_input_collapsed';
import { selectSearchResults } from '../../selectors/search/select_search_results';
import { SearchServiceData } from '../../validation/search/types';
import { LatLong } from '../../validation/latlong/types';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    searchTerm: selectSearchTerm(store),
    searchLocation: selectSearchLocation(store),
    searchPage: selectSearchPage(store),
    numberOfSearchPages: selectNumberOfSearchPages(store),
    searchResults: selectSearchResults(store),
    searchLatLong: selectSearchLatLong(store),
    collapseSearchInput: selectIsInputCollapsed(store),
});

type Actions =
    SaveServiceAction |
    OpenServiceAction |
    DisableAnalyticsAction |
    BookmarkServiceAction |
    UnbookmarkServiceAction |
    SaveSearchTermAction |
    SaveSearchLocationAction |
    SaveSearchLatLongAction |
    SaveSearchPageAction |
    SaveNumberOfSearchPagesAction |
    SaveSearchResultsAction |
    SetCollapseSearchInputAction |
    SearchQueriedAction |
    OpenHeaderMenuAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): SearchComponentActions => ({
    saveService: (service: HumanServiceData): SaveServiceAction => (
        dispatch(saveService(service))
    ),
    openService: (service: HumanServiceData): OpenServiceAction => (
        dispatch(openService(service))
    ),
    disableAnalytics: (disable: boolean): DisableAnalyticsAction => (
        dispatch(disableAnalytics(disable))
    ),
    bookmarkService: (service: HumanServiceData): BookmarkServiceAction => (
        dispatch(bookmarkService(service))
    ),
    unbookmarkService: (service: HumanServiceData): UnbookmarkServiceAction => (
        dispatch(unbookmarkService(service))
    ),
    saveSearchTerm: (searchTerm: string): SaveSearchTermAction => (
        dispatch(saveSearchTerm(searchTerm))
    ),
    saveSearchLocation: (searchLocation: string): SaveSearchLocationAction => (
        dispatch(saveSearchLocation(searchLocation))
    ),
    saveSearchLatLong: (searchLatLong: LatLong): SaveSearchLatLongAction => (
        dispatch(saveSearchLatLong(searchLatLong))
    ),
    saveSearchPage: (searchPage: number): SaveSearchPageAction => (
        dispatch(saveSearchPage(searchPage))
    ),
    saveNumberOfSearchPages: (numberOfSearchPages: number): SaveNumberOfSearchPagesAction => (
        dispatch(saveNumberOfSearchPages(numberOfSearchPages))
    ),
    saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>): SaveSearchResultsAction => (
        dispatch(saveSearchResults(searchResults))
    ),
    setCollapseSearchInput: (collapseSearchInput: boolean): SetCollapseSearchInputAction => (
        dispatch(setCollapseSearchInput(collapseSearchInput))
    ),
    searchQueried: (searchTerm: string, searchLocation: string): SearchQueriedAction => (
        dispatch(searchQueried(searchTerm, searchLocation))
    ),
    openHeaderMenu: (): OpenHeaderMenuAction => (
        dispatch(openHeaderMenu())
    ),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);

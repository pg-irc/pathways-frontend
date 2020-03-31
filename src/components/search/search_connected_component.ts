import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { saveService, SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { disableAnalytics, DisableAnalyticsAction, HidePartialLocalizationMessageAction, hidePartialLocalizationMessage } from '../../stores/user_profile';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import {
    SaveSearchTermAction, SaveSearchLocationAction, SetCollapseSearchInputAction,
    saveSearchLocation, saveSearchTerm, setCollapseSearchInput, SaveSearchResultsAction, saveSearchResults,
    SaveSearchLatLongAction, saveSearchLatLong,
} from '../../stores/search';
import { selectSearchTerm } from '../../selectors/search/select_search_term';
import { selectSearchLocation } from '../../selectors/search/select_search_location';
import { selectIsInputCollapsed } from '../../selectors/search/select_is_input_collapsed';
import { selectShowPartialLocalizationMessage } from '../../selectors/user_profile/select_show_partial_localization_message';
import { selectSearchResults } from '../../selectors/search/select_search_results';
import { SearchServiceData } from '../../validation/search/types';
import { selectSearchLatLong } from '../../selectors/search/select_search_lat_long';
import { LatLong } from '../../validation/latlong/types';
import { OpenHeaderMenuAction, openHeaderMenu } from '../../stores/header_menu';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    searchTerm: selectSearchTerm(store),
    searchLocation: selectSearchLocation(store),
    searchResults: selectSearchResults(store),
    searchLatLong: selectSearchLatLong(store),
    collapseSearchInput: selectIsInputCollapsed(store),
    showPartialLocalizationMessage: selectShowPartialLocalizationMessage(store),
});

type Actions =
    SaveServiceAction |
    DisableAnalyticsAction |
    BookmarkServiceAction |
    UnbookmarkServiceAction |
    SaveSearchTermAction |
    SaveSearchLocationAction |
    SaveSearchLatLongAction |
    SaveSearchResultsAction |
    SetCollapseSearchInputAction |
    HidePartialLocalizationMessageAction |
    OpenHeaderMenuAction;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): SearchComponentActions => ({
    saveService: (service: HumanServiceData): SaveServiceAction => (
        dispatch(saveService(service))
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
    saveSearchResults: (searchResults: ReadonlyArray<SearchServiceData>): SaveSearchResultsAction => (
        dispatch(saveSearchResults(searchResults))
    ),
    setCollapseSearchInput: (collapseSearchInput: boolean): SetCollapseSearchInputAction => (
        dispatch(setCollapseSearchInput(collapseSearchInput))
    ),
    hidePartialLocalizationMessage: (): HidePartialLocalizationMessageAction => (
        dispatch(hidePartialLocalizationMessage())
    ),
    openHeaderMenu: (): OpenHeaderMenuAction => (
        dispatch(openHeaderMenu())
    ),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../stores';
import { SearchComponentProps, SearchComponent, SearchComponentActions } from './search_component';
import { saveService, SaveServiceAction, BookmarkServiceAction, UnbookmarkServiceAction, bookmarkService, unbookmarkService } from '../../stores/services/actions';
import { HumanServiceData } from '../../validation/services/types';
import { disableAnalytics, DisableAnalyticsAction, HidePartialLocalizationMessageAction, hidePartialLocalizationMessage } from '../../stores/user_profile';
import { selectBookmarkedServicesIds } from '../../selectors/services/select_bookmarked_services_ids';
import { SaveSearchTermAction, SaveSearchLocationAction, SetIsInputCollapsedAction, saveSearchLocation, saveSearchTerm, setIsSearchInputCollapsed } from '../../stores/search';
import { selectSearchTerm } from '../../selectors/search/select_search_term';
import { selectSearchLocation } from '../../selectors/search/select_search_location';
import { selectIsInputCollapsed } from '../../selectors/search/select_is_input_collapsed';
import { selectShowPartialLocalizationMessage } from '../../selectors/user_profile/select_show_partial_localization_message';

const mapStateToProps = (store: Store): SearchComponentProps => ({
    bookmarkedServicesIds: selectBookmarkedServicesIds(store),
    searchTerm: selectSearchTerm(store),
    searchLocation: selectSearchLocation(store),
    isSearchInputCollapsed: selectIsInputCollapsed(store),
    showPartialLocalizationMessage: selectShowPartialLocalizationMessage(store),
});

type Actions =
    SaveServiceAction |
    DisableAnalyticsAction |
    BookmarkServiceAction |
    UnbookmarkServiceAction |
    SaveSearchTermAction |
    SaveSearchLocationAction |
    SetIsInputCollapsedAction |
    HidePartialLocalizationMessageAction;

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
    setIsSearchInputCollapsed: (isSearchInputCollapsed: boolean): SetIsInputCollapsedAction => (
        dispatch(setIsSearchInputCollapsed(isSearchInputCollapsed))
    ),
    hidePartialLocalizationMessage: (): HidePartialLocalizationMessageAction => (
        dispatch(hidePartialLocalizationMessage())
    ),
});

export const SearchConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);

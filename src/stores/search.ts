import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { SearchServiceData } from '../validation/search/types';
import { LatLong } from '../validation/latlong/types';
import { ClearAllUserDataAction } from './questionnaire/actions';

export type SaveSearchTermAction = Readonly<ReturnType<typeof saveSearchTerm>>;
export type SaveSearchLocationAction = Readonly<ReturnType<typeof saveSearchLocation>>;
export type SaveSearchLatLongAction = Readonly<ReturnType<typeof saveSearchLatLong>>;
export type SaveSearchPageAction = Readonly<ReturnType<typeof saveSearchPage>>;
export type SaveNumberOfSearchPagesAction = Readonly<ReturnType<typeof saveNumberOfSearchPages>>;
export type SaveSearchOffsetAction = Readonly<ReturnType<typeof saveSearchOffset>>;
export type SaveSearchResultsAction = Readonly<ReturnType<typeof saveSearchResults>>;
export type SetCollapseSearchInputAction = Readonly<ReturnType<typeof setCollapseSearchInput>>;
export type SearchRequestAction = Readonly<ReturnType<typeof searchRequest>>;
export type LoadMoreRequestAction = Readonly<ReturnType<typeof loadMoreRequest>>;
export type SetIsSearchLoadingAction = Readonly<ReturnType<typeof setIsSearchLoading>>;

// tslint:disable-next-line:typedef
export const saveSearchTerm = (searchTerm: string) => (
    helpers.makeAction(constants.SAVE_SEARCH_TERM, { searchTerm })
);

// tslint:disable-next-line:typedef
export const saveSearchLocation = (searchLocation: string) => (
    helpers.makeAction(constants.SAVE_SEARCH_LOCATION, { searchLocation })
);

// tslint:disable-next-line: typedef
export const saveSearchLatLong = (searchLatLong: LatLong) => (
    helpers.makeAction(constants.SAVE_SEARCH_LAT_LONG, { searchLatLong })
);

// tslint:disable-next-line: typedef
export const saveSearchPage = (searchPage: number) => (
    helpers.makeAction(constants.SAVE_SEARCH_PAGE, { searchPage })
);

// tslint:disable-next-line: typedef
export const saveNumberOfSearchPages = (numberOfSearchPages: number) => (
    helpers.makeAction(constants.SAVE_NUMBER_OF_SEARCH_PAGES, { numberOfSearchPages })
);

// tslint:disable-next-line: typedef
export const saveSearchOffset = (searchOffset: number) => (
    helpers.makeAction(constants.SAVE_SEARCH_OFFSET, { searchOffset })
);

// tslint:disable-next-line:typedef
export const saveSearchResults = (searchResults: ReadonlyArray<SearchServiceData>) => (
    helpers.makeAction(constants.SAVE_SEARCH_RESULTS, { searchResults })
);

// tslint:disable-next-line:typedef
export const setCollapseSearchInput = (collapseSearchInput: boolean) => (
    helpers.makeAction(constants.SET_COLLAPSE_SEARCH_INPUT, { collapseSearchInput })
);

// tslint:disable-next-line: typedef
export const searchRequest = (searchTermInput: string, searchLocationInput: string) => (
    helpers.makeAction(constants.SEARCH_REQUEST, { searchTermInput, searchLocationInput })
);

// tslint:disable-next-line: typedef
export const loadMoreRequest = () => (
    helpers.makeAction(constants.LOAD_MORE_REQUEST)
);

// tslint:disable-next-line: typedef
export const setIsSearchLoading = (isLoading: boolean) => (
    helpers.makeAction(constants.SET_IS_SEARCH_LOADING, { isLoading })
);

export type SearchAction =
    SaveSearchTermAction |
    SaveSearchLocationAction |
    SaveSearchLatLongAction |
    SaveSearchPageAction |
    SaveNumberOfSearchPagesAction |
    SaveSearchOffsetAction |
    SaveSearchResultsAction |
    SetCollapseSearchInputAction |
    ClearAllUserDataAction |
    SearchRequestAction |
    LoadMoreRequestAction |
    SetIsSearchLoadingAction;

export interface SearchStore {
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly searchLatLong: LatLong;
    readonly searchPage: number;
    readonly numberOfSearchPages: number;
    readonly searchResults: ReadonlyArray<SearchServiceData>;
    readonly searchOffset: number;
    readonly collapseSearchInput: boolean;
    readonly isSearchLoading: boolean;
}

export const buildDefaultStore = (): SearchStore => ({
    searchTerm: '',
    searchLocation: '',
    searchLatLong: undefined,
    searchPage: 0,
    numberOfSearchPages: 0,
    searchResults: [],
    searchOffset: 0,
    collapseSearchInput: false,
    isSearchLoading: false,
});

export const reducer = (store: SearchStore = buildDefaultStore(), action?: SearchAction): SearchStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SAVE_SEARCH_TERM:
            return ({
                ...store,
                searchTerm: action.payload.searchTerm,
            });
        case constants.SAVE_SEARCH_LOCATION:
            return ({
                ...store,
                searchLocation: action.payload.searchLocation,
            });
        case constants.SAVE_SEARCH_LAT_LONG:
            return ({
                ...store,
                searchLatLong: action.payload.searchLatLong,
            });
        case constants.SAVE_SEARCH_PAGE:
            return ({
                ...store,
                searchPage: action.payload.searchPage,
            });
        case constants.SAVE_NUMBER_OF_SEARCH_PAGES:
            return ({
                ...store,
                numberOfSearchPages: action.payload.numberOfSearchPages,
            });
        case constants.SAVE_SEARCH_RESULTS:
            return ({
                ...store,
                searchResults: action.payload.searchResults,
            });
        case constants.SAVE_SEARCH_OFFSET:
            return ({
                ...store,
                searchOffset: action.payload.searchOffset,
            });
        case constants.SET_COLLAPSE_SEARCH_INPUT:
            return ({
                ...store,
                collapseSearchInput: action.payload.collapseSearchInput,
            });
        case constants.SET_IS_SEARCH_LOADING:
            return ({
                ...store,
                isSearchLoading: action.payload.isLoading,
            });
        case constants.CLEAR_ALL_USER_DATA:
            return buildDefaultStore();
        default:
            return store;
    }
};
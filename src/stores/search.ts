import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export type SaveSearchTermAction = Readonly<ReturnType<typeof saveSearchTerm>>;
export type SaveSearchLocationAction = Readonly<ReturnType<typeof saveSearchLocation>>;
export type SetIsInputCollapsedAction = Readonly<ReturnType<typeof setIsSearchInputCollapsed>>;

// tslint:disable-next-line:typedef
export const saveSearchTerm = (searchTerm: string) => (
    helpers.makeAction(constants.SAVE_SEARCH_TERM, { searchTerm })
);

// tslint:disable-next-line:typedef
export const saveSearchLocation = (searchLocation: string) => (
    helpers.makeAction(constants.SAVE_SEARCH_LOCATION, { searchLocation })
);

// tslint:disable-next-line:typedef
export const setIsSearchInputCollapsed = (isSearchInputCollapsed: boolean) => (
    helpers.makeAction(constants.SET_IS_INPUT_COLLAPSED, { isSearchInputCollapsed })
);

export type SearchAction = SaveSearchTermAction | SaveSearchLocationAction | SetIsInputCollapsedAction;

export interface SearchStore {
    readonly searchTerm: string;
    readonly searchLocation: string;
    readonly isSearchInputCollapsed: boolean;
}

export const buildDefaultStore = (): SearchStore => ({
    searchTerm: '',
    searchLocation: '',
    isSearchInputCollapsed: false,
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
        case constants.SET_IS_INPUT_COLLAPSED:
            return ({
                ...store,
                isSearchInputCollapsed: action.payload.isSearchInputCollapsed,
            });
        default:
            return store;
    }
};
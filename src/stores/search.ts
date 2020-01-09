import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export type SaveSearchTermAction = Readonly<ReturnType<typeof saveSearchTerm>>;
export type SaveSearchLocationAction = Readonly<ReturnType<typeof saveSearchLocation>>;

// tslint:disable-next-line:typedef
export const saveSearchTerm = (searchTerm: string) => (
    helpers.makeAction(constants.SAVE_SEARCH_TERM, { searchTerm })
);

// tslint:disable-next-line:typedef
export const saveSearchLocation = (searchLocation: string) => (
    helpers.makeAction(constants.SAVE_SEARCH_LOCATION, { searchLocation })
);

export type SearchAction = SaveSearchTermAction | SaveSearchLocationAction;

export interface SearchStore {
    readonly searchTerm: string;
    readonly searchLocation: string;
}

export const buildDefaultStore = (): SearchStore => ({
    searchTerm: '',
    searchLocation: '',
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
        default:
            return store;
    }
};
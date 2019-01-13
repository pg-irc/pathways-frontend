import * as constants from '../../application/constants';
import { LoadCurrentLocaleAsync, SaveCurrentLocaleAsync } from './actions';
import { LocaleInfo } from '../../locale';

export { LoadCurrentLocaleAsync, SaveCurrentLocaleAsync };

export type ReducerActions = SaveCurrentLocaleAsync.Request | SaveCurrentLocaleAsync.Result |
    LoadCurrentLocaleAsync.Request | LoadCurrentLocaleAsync.Result;

export interface LocaleStore {
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly code: string;
    readonly fallback: string;
    readonly loading: boolean;
    readonly errorMessage: string;
}

export const buildDefaultStore = (): LocaleStore => ({
    availableLocales: [],
    code: undefined,
    fallback: undefined,
    loading: false,
    errorMessage: '',
});

export const reducer = (store: LocaleStore = buildDefaultStore(), action?: ReducerActions): LocaleStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_CURRENT_LOCALE_REQUEST:
            return { ...store, errorMessage: '', loading: true };
        case constants.LOAD_CURRENT_LOCALE_SUCCESS:
            return { ...store, errorMessage: '', loading: false, code: action.payload.localeCode };
        case constants.LOAD_CURRENT_LOCALE_FAILURE: {
            const payload = action.payload;
            return { ...store, errorMessage: payload.message, loading: false };
        }
        case constants.SET_LOCALE_REQUEST:
            return { ...store, errorMessage: '', loading: true };
        case constants.SET_LOCALE_SUCCESS:
            return { ...store, errorMessage: '', loading: false, code: action.payload.localeCode };
        case constants.SET_LOCALE_FAILURE: {
            const payload = action.payload;
            return { ...store, errorMessage: payload.message, loading: false };
        }
        default:
            return store;
    }
};
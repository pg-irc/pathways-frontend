import * as constants from '../../application/constants';
import * as setLocale from './set_locale';
import * as loadCurrentLocale from './load_current_locale';
import { SetLocale } from './set_locale';
import { LoadCurrentLocale } from './load_current_locale';
import { LocaleInfo } from '../../locale';

export { SetLocale };
export { LoadCurrentLocale };

export type ReducerActions = SetLocale.Request | SetLocale.Result |
            LoadCurrentLocale.Request | LoadCurrentLocale.Result;

export interface Store {
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly code: string;
    readonly fallback: string;
    readonly loading: boolean;
    readonly errorMessage: string;
    readonly localeSwitcherOpen: boolean;
}

export const buildDefaultStore = (): Store => ({
    availableLocales: [],
    code: undefined,
    fallback: undefined,
    loading: false,
    errorMessage: '',
    localeSwitcherOpen: false,
});

export const setLocaleActions = setLocale;
export const loadCurrentLocaleActions = loadCurrentLocale;

export const reducer = (store: Store = buildDefaultStore(), action?: ReducerActions): Store => {
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
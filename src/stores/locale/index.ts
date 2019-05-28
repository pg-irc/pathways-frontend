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

export interface LocaleStore {
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly code: string;
    readonly fallback: string;
    readonly loading: boolean;
    readonly isSet: boolean;
    readonly errorMessage: string;
}

export const buildDefaultStore = (): LocaleStore => ({
    availableLocales: [],
    code: undefined,
    fallback: undefined,
    loading: false,
    isSet: false,
    errorMessage: '',
});

export const setLocaleActions = setLocale;
export const loadCurrentLocaleActions = loadCurrentLocale;

export const reducer = (store: LocaleStore = buildDefaultStore(), action?: ReducerActions): LocaleStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_CURRENT_LOCALE_REQUEST:
            return { ...store, errorMessage: '', loading: true };
        case constants.LOAD_CURRENT_LOCALE_SUCCESS:
            return { ...store, errorMessage: '', loading: false, isSet: action.payload.isSet, code: action.payload.localeCode };
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
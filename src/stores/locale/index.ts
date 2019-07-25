import * as constants from '../../application/constants';
import * as setLocale from './set_locale';
import * as loadCurrentLocale from './load_current_locale';
import { SetLocale } from './set_locale';
import { LoadCurrentLocale } from './load_current_locale';
import { LocaleInfo } from '../../locale';

export { SetLocale };
export { LoadCurrentLocale };

export type ReducerActions = SetLocale.Request | SetLocale.Result | SetLocale.Success | SetLocale.Failure |
    LoadCurrentLocale.Request | LoadCurrentLocale.Result | LoadCurrentLocale.Success | LoadCurrentLocale.Failure;

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
            return updateCurrentLocaleRequest(store);
        case constants.LOAD_CURRENT_LOCALE_SUCCESS:
            return updateCurrentLocaleSuccess(store, action);
        case constants.LOAD_CURRENT_LOCALE_FAILURE:
            return updateCurrentLocaleError(store, action);
        case constants.SET_LOCALE_REQUEST:
            return setLocaleRequest(store);
        case constants.SET_LOCALE_SUCCESS:
            return setLocaleSuccess(store, action); 
        case constants.SET_LOCALE_FAILURE:
            return setLocaleError(store, action);
        default:
            return store;
    }
};

const updateCurrentLocaleRequest = (store: LocaleStore): LocaleStore => {
    return {
       ...store,
       errorMessage: '',
       loading: true
   }
};

const updateCurrentLocaleSuccess = (store: LocaleStore, action: LoadCurrentLocale.Success): LocaleStore => {
    const { message, loading, isSet, localeCode } = action.payload; 
    return {
        ...store,
        errorMessage: message,
        loading,
        isSet,
        code: localeCode
    }
};

const updateCurrentLocaleError = (store: LocaleStore, action: LoadCurrentLocale.Failure): LocaleStore => {
    const { message, loading } = action.payload;
    return {
       ...store,
       errorMessage: message,
       loading
   }
}

const setLocaleRequest = (store: LocaleStore): LocaleStore => {
    return {
        ...store,
        errorMessage: '',
        loading: true
    }
}

const setLocaleSuccess = (store: LocaleStore, action: SetLocale.Success) => {
    const { message, loading, localeCode } = action.payload;
    return {
        ...store,
        errorMessage: message,
        loading,
        code: localeCode
    }
}; 

const setLocaleError = (store: LocaleStore, action: SetLocale.Failure) => {
    const { message, loading } = action.payload;
    return {
        ...store,
        errorMessage: message,
        loading
    }
}

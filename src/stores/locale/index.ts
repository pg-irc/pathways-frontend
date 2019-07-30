import * as constants from '../../application/constants';
import { LocaleInfo } from '../../locale';
import { 
    LoadCurrentLocaleRequestAction, loadCurrentLocaleRequest,
    LoadCurrentLocaleSuccessAction, loadCurrentLocaleSuccess, LoadCurrentLocaleErrorAction, loadCurrentLocaleFailure,
    SetLocaleRequestAction,setLocaleRequest, SetLocaleSuccessAction, setLocaleSuccess, SetLocaleErrorAction, setLocaleFailure,  
    SetLocaleAction, LoadCurrentLocaleAction, SetLocaleResult, LoadCurrentLocaleResult, LocaleAction
} from './actions';

export { 
    LoadCurrentLocaleRequestAction, loadCurrentLocaleRequest,loadCurrentLocaleSuccess, 
    LoadCurrentLocaleErrorAction, loadCurrentLocaleFailure, LoadCurrentLocaleResult, LoadCurrentLocaleAction, setLocaleRequest, 
    SetLocaleAction, setLocaleSuccess, setLocaleFailure, SetLocaleResult, SetLocaleRequestAction, LocaleAction
}; 

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

export const reducer = (store: LocaleStore = buildDefaultStore(), action?: LocaleAction): LocaleStore => {
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
            return setNewLocaleRequest(store);
        case constants.SET_LOCALE_SUCCESS:
            return setNewLocaleSuccess(store, action); 
        case constants.SET_LOCALE_FAILURE:
            return setNewLocaleError(store, action);
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

const updateCurrentLocaleSuccess = (store: LocaleStore, action: LoadCurrentLocaleSuccessAction): LocaleStore => {
    const { message, loading, isSet, localeCode } = action.payload; 
    return {
        ...store,
        errorMessage: message,
        loading,
        isSet,
        code: localeCode
    }
};

const updateCurrentLocaleError = (store: LocaleStore, action: LoadCurrentLocaleErrorAction): LocaleStore => {
    const { message, loading } = action.payload;
    return {
       ...store,
       errorMessage: message,
       loading
   }
}

const setNewLocaleRequest = (store: LocaleStore): LocaleStore => {
    return {
        ...store,
        errorMessage: '',
        loading: true
    }
}

const setNewLocaleSuccess = (store: LocaleStore, action: SetLocaleSuccessAction) => {
    const { message, loading, localeCode } = action.payload;
    return {
        ...store,
        errorMessage: message,
        loading,
        code: localeCode
    }
}; 

const setNewLocaleError = (store: LocaleStore, action: SetLocaleErrorAction) => {
    const { message, loading } = action.payload;
    return {
        ...store,
        errorMessage: message,
        loading
    }
}

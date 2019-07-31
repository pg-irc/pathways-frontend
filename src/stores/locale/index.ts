import * as constants from '../../application/constants';
import { LocaleInfo } from '../../locale';
import * as actions from './actions';

export interface LocaleStore {
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
    readonly code: string;
    readonly fallback: string;
    readonly loading: boolean;
    readonly isSaved: boolean;
    readonly errorMessage: string;
}

export const buildDefaultStore = (): LocaleStore => ({
    availableLocales: [],
    code: undefined,
    fallback: undefined,
    loading: false,
    isSaved: false,
    errorMessage: '',
});

export const reducer = (store: LocaleStore = buildDefaultStore(), action?: actions.LocaleAction): LocaleStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_CURRENT_LOCALE_REQUEST:
            return { ...store, errorMessage: '', loading: true};
        case constants.LOAD_CURRENT_LOCALE_SUCCESS:
            return { ...store, errorMessage: '', loading: false, isSaved: action.payload.isSaved, code: action.payload.localeCode };
        case constants.LOAD_CURRENT_LOCALE_FAILURE:
            return { ...store, errorMessage: action.payload.message, loading: false };
        case constants.SAVE_LOCALE_REQUEST:
            return { ...store, errorMessage: '', loading: true };
        case constants.SAVE_LOCALE_SUCCESS:
            return { ...store, errorMessage: '', loading: false, code: action.payload.localeCode };
        case constants.SAVE_LOCALE_FAILURE:
            return { ...store, errorMessage: action.payload.message, loading: false };
        default:
            return store;
    }
};

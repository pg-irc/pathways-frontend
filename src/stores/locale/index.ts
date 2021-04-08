import * as constants from '../../application/constants';
import * as actions from './actions';

export interface LocaleStore {
    // TODO rename to currentLocale
    readonly code: string;
    // TODO remove the fallback property, hard-code 'en'
    readonly loading: boolean;
}

export const buildDefaultStore = (): LocaleStore => ({
    code: undefined,
    loading: false,
});

export const reducer = (store: LocaleStore = buildDefaultStore(), action?: actions.LocaleAction): LocaleStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_CURRENT_LOCALE_REQUEST:
            return { ...store, loading: true };
        case constants.LOAD_CURRENT_LOCALE_SUCCESS:
            return { ...store, loading: false, code: action.payload.localeCode };
        case constants.LOAD_CURRENT_LOCALE_FAILURE:
            return { ...store, loading: false };
        case constants.SAVE_LOCALE_REQUEST:
            return { ...store, loading: true };
        case constants.SAVE_LOCALE_SUCCESS:
            return { ...store, loading: false, code: action.payload.localeCode };
        case constants.SAVE_LOCALE_FAILURE:
            return { ...store, loading: false };
        case constants.RESET_LOCALE:
            // intended fall through
        case constants.CLEAR_ALL_USER_DATA:
            return { ...store, code: undefined };
        default:
            return store;
    }
};

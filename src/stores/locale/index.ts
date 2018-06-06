import * as constants from '../../application/constants';
import * as setLocale from './set_locale';
import * as loadCurrentLocale from './load_current_locale';
import { SetLocale } from './set_locale';
import { LoadCurrentLocale } from './load_current_locale';

export { SetLocale };
export { LoadCurrentLocale };

type ReducerActions = SetLocale.Request | SetLocale.Result | LoadCurrentLocale.Request | LoadCurrentLocale.Result;
export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

export const DEFAULT_LOCALE_CODE = 'en';
// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    code: DEFAULT_LOCALE_CODE,
    loading: false,
    errorMessage: '',
});

export const setLocaleActions = setLocale;
export const loadCurrentLocaleActions = loadCurrentLocale;

export const reducer = (store: Store = buildDefaultStore(), action?: ReducerActions): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {

        case constants.LOAD_CURRENT_LOCALE_REQUEST:
            return { ...store, loading: true };
        case constants.LOAD_CURRENT_LOCALE_SUCCESS:
            return { ...buildDefaultStore(), code: action.payload.locale.code };
        case constants.LOAD_CURRENT_LOCALE_FAILURE: {
            const payload = action.payload;
            return { ...buildDefaultStore(), errorMessage: payload.message };
        }

        case constants.SET_LOCALE_REQUEST:
            return { ...store, loading: true };
        case constants.SET_LOCALE_SUCCESS:
            return { ...buildDefaultStore(), code: action.payload.locale.code };
        case constants.SET_LOCALE_FAILURE: {
            const payload = action.payload;
            return { ...buildDefaultStore(), errorMessage: payload.message };
        }

        default:
            return store;
    }
};
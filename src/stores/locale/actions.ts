import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export type LoadLocaleRequestAction = Readonly<ReturnType<typeof loadLocaleRequest>>;
export type LoadLocaleSuccessAction = Readonly<ReturnType<typeof loadLocaleSuccess>>;
export type LoadLocaleFailureAction = Readonly<ReturnType<typeof loadLocaleFailure>>;

export type LoadLocaleAction = LoadLocaleRequestAction | LoadLocaleSuccessAction | LoadLocaleFailureAction;

export type SaveLocaleRequestAction = Readonly<ReturnType<typeof saveLocaleRequest>>;
export type SaveLocaleSuccessAction = Readonly<ReturnType<typeof saveLocaleSuccess>>;
export type SaveLocaleFailureAction = Readonly<ReturnType<typeof saveLocaleFailure>>;
export type SaveLocaleResult = SaveLocaleSuccessAction | SaveLocaleFailureAction;

export type SaveLocaleAction = SaveLocaleRequestAction | SaveLocaleSuccessAction | SaveLocaleFailureAction;
export type LocaleAction = LoadLocaleAction | SaveLocaleAction;

// tslint:disable-next-line:typedef
export const loadLocaleRequest = () => {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_REQUEST);
};

// tslint:disable-next-line:typedef
export function loadLocaleSuccess(message: string, loading: boolean, localeCode: string, isSaved: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_SUCCESS, { message, loading, localeCode, isSaved });
}

// tslint:disable-next-line:typedef
export function loadLocaleFailure(message: string, loading: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_FAILURE, { message, loading });
}

// tslint:disable-next-line:typedef
export const saveLocaleRequest = (localeCode: string) => {
    return helpers.makeAction(constants.SAVE_LOCALE_REQUEST, { localeCode });
};

// tslint:disable-next-line:typedef
export function saveLocaleSuccess(message: string, loading: boolean, localeCode: string) {
    return helpers.makeAction(constants.SAVE_LOCALE_SUCCESS, { message, loading, localeCode });
}

// tslint:disable-next-line:typedef
export function saveLocaleFailure(message: string, loading: boolean, localeCode: string) {
    return helpers.makeAction(constants.SAVE_LOCALE_FAILURE, { message, loading, localeCode });
}
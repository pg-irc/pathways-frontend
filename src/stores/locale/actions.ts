import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export type LoadLocaleRequestAction = Readonly<ReturnType<typeof loadLocaleRequest>>;
export type LoadLocaleSuccessAction = Readonly<ReturnType<typeof loadLocaleSuccess>>;
export type LoadLocaleFailureAction = Readonly<ReturnType<typeof loadLocaleFailure>>;
export type LoadLocaleResult = LoadLocaleSuccessAction | LoadLocaleFailureAction;

export type LoadLocaleAction = LoadLocaleRequestAction | LoadLocaleSuccessAction | LoadLocaleFailureAction;

export type SetLocaleRequestAction = Readonly<ReturnType<typeof setLocaleRequest>>;
export type SetLocaleSuccessAction = Readonly<ReturnType<typeof setLocaleSuccess>>;
export type SetLocaleFailureAction = Readonly<ReturnType<typeof setLocaleFailure>>;
export type SetLocaleResult = SetLocaleSuccessAction | SetLocaleFailureAction;

export type SetLocaleAction = SetLocaleRequestAction | SetLocaleSuccessAction | SetLocaleFailureAction;
export type LocaleAction = LoadLocaleAction | SetLocaleAction;

// tslint:disable-next-line:typedef
export const loadLocaleRequest = () => {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_REQUEST);
};

// tslint:disable-next-line:typedef
export function loadLocaleSuccess(message: string, loading: boolean, localeCode: string, isSet: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_SUCCESS, { message, loading, localeCode, isSet });
}

// tslint:disable-next-line:typedef
export function loadLocaleFailure(message: string, loading: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_FAILURE, { message, loading });
}

// tslint:disable-next-line:typedef
export const setLocaleRequest = (localeCode: string) => {
    return helpers.makeAction(constants.SET_LOCALE_REQUEST, { localeCode });
};

// tslint:disable-next-line:typedef
export function setLocaleSuccess(message: string, loading: boolean, localeCode: string) {
    return helpers.makeAction(constants.SET_LOCALE_SUCCESS, { message, loading, localeCode });
}

// tslint:disable-next-line:typedef
export function setLocaleFailure(message: string, loading: boolean, localeCode: string) {
    return helpers.makeAction(constants.SET_LOCALE_FAILURE, { message, loading, localeCode });
}
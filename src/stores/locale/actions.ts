import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export type LoadCurrentLocaleRequestAction = Readonly<ReturnType<typeof loadCurrentLocaleRequest>>;
export type LoadCurrentLocaleSuccessAction = Readonly<ReturnType<typeof loadCurrentLocaleSuccess>>;
export type LoadCurrentLocaleErrorAction = Readonly<ReturnType<typeof loadCurrentLocaleFailure>>;
export type LoadCurrentLocaleResult = LoadCurrentLocaleSuccessAction | LoadCurrentLocaleErrorAction;

export type LoadCurrentLocaleAction = LoadCurrentLocaleRequestAction | LoadCurrentLocaleSuccessAction | LoadCurrentLocaleErrorAction;

export type SetLocaleRequestAction = Readonly<ReturnType<typeof setLocaleRequest>>; 
export type SetLocaleSuccessAction = Readonly<ReturnType<typeof setLocaleSuccess>>; 
export type SetLocaleErrorAction = Readonly<ReturnType<typeof setLocaleFailure>>; 
export type SetLocaleResult = SetLocaleSuccessAction | SetLocaleErrorAction

export type SetLocaleAction = SetLocaleRequestAction | SetLocaleSuccessAction | SetLocaleErrorAction; 

export type LocaleAction = LoadCurrentLocaleAction | SetLocaleAction;

// tslint:disable-next-line:typedef
export const loadCurrentLocaleRequest = () => {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_REQUEST);
};

// tslint:disable-next-line:typedef
export function loadCurrentLocaleSuccess(message: string, loading: boolean, localeCode: string, isSet: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_SUCCESS, { message, loading, localeCode, isSet });
}

// tslint:disable-next-line:typedef
export function loadCurrentLocaleFailure(message: string, loading: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_FAILURE, { message, loading });
}

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
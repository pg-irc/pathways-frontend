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
export function loadLocaleSuccess(localeCode: string, isSaved: boolean, flipOrientation: boolean, RTL: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_SUCCESS, { localeCode, isSaved, flipOrientation, RTL });
}

// tslint:disable-next-line:typedef
export function loadLocaleFailure(message: string) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_FAILURE, { message });
}

// tslint:disable-next-line:typedef
export const saveLocaleRequest = (localeCode: string, flipOrientation: boolean, isRTL: boolean) => {
    return helpers.makeAction(constants.SAVE_LOCALE_REQUEST, { localeCode, flipOrientation, isRTL });
};

// tslint:disable-next-line:typedef
export function saveLocaleSuccess(localeCode: string, flipOrientation: boolean, RTL: boolean) {
    return helpers.makeAction(constants.SAVE_LOCALE_SUCCESS, { localeCode, flipOrientation, RTL });
}

// tslint:disable-next-line:typedef
export function saveLocaleFailure(message: string, localeCode: string) {
    return helpers.makeAction(constants.SAVE_LOCALE_FAILURE, { message, localeCode });
}
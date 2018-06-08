import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export namespace SetLocale {
    export type Request = Readonly<ReturnType<typeof request>>;
    export type Success = Readonly<ReturnType<typeof success>>;
    export type Failure = Readonly<ReturnType<typeof failure>>;
    export type Result = Success | Failure;
}

// tslint:disable-next-line:typedef
export const request = (localeCode: string) => {
    return helpers.makeAction(constants.SET_LOCALE_REQUEST, { localeCode });
};

// tslint:disable-next-line:typedef
export function success(localeCode: string) {
    return helpers.makeAction(constants.SET_LOCALE_SUCCESS, { localeCode });
}

// tslint:disable-next-line:typedef
export function failure(message: string, localeCode: string) {
    return helpers.makeAction(constants.SET_LOCALE_FAILURE, { message, localeCode });
}
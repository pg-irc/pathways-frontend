import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export namespace LoadCurrentLocale {
    export type Request = Readonly<ReturnType<typeof request>>;
    export type Success = Readonly<ReturnType<typeof success>>;
    export type Failure = Readonly<ReturnType<typeof failure>>;
    export type Result = Success | Failure;
}

// tslint:disable-next-line:typedef
export const request = () => {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_REQUEST);
};

// tslint:disable-next-line:typedef
export function success(localeCode: string, isSet: boolean) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_SUCCESS, { localeCode, isSet });
}

// tslint:disable-next-line:typedef
export function failure(message: string) {
    return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_FAILURE, { message });
}

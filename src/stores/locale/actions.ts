// tslint:disable:typedef
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export namespace LoadCurrentLocaleAsync {
    export const request = () => {
        return helpers.makeAction(constants.LOAD_CURRENT_LOCALE_REQUEST);
    };

    export const success = (localeCode: string) => (
        helpers.makeAction(constants.LOAD_CURRENT_LOCALE_SUCCESS, { localeCode })
    );

    export const failure = (message: string) => (
        helpers.makeAction(constants.LOAD_CURRENT_LOCALE_FAILURE, { message })
    );

    export type Request = Readonly<ReturnType<typeof request>>;
    export type Success = Readonly<ReturnType<typeof success>>;
    export type Failure = Readonly<ReturnType<typeof failure>>;
    export type Result = Success | Failure;
}

export namespace SaveCurrentLocaleAsync {
    export const request = (localeCode: string) => {
        return helpers.makeAction(constants.SET_LOCALE_REQUEST, { localeCode });
    };

    export const success = (localeCode: string) => (
        helpers.makeAction(constants.SET_LOCALE_SUCCESS, { localeCode })
    );

    export const failure = (message: string, localeCode: string) => (
        helpers.makeAction(constants.SET_LOCALE_FAILURE, { message, localeCode })
    );

    export type Request = Readonly<ReturnType<typeof request>>;
    export type Success = Readonly<ReturnType<typeof success>>;
    export type Failure = Readonly<ReturnType<typeof failure>>;
    export type Result = Success | Failure;
}

// tslint:disable:typedef

import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export namespace LoadFontsAsync {

    export const request = (fonts: Fonts) => (
        helpers.makeAction(constants.LOAD_FONTS_REQUEST, { fonts })
    );

    export const success = (fonts: Fonts) => (
        helpers.makeAction(constants.LOAD_FONTS_SUCCESS, { fonts })
    );

    export const failure = (message: string, fonts: Fonts) => (
        helpers.makeAction(constants.LOAD_FONTS_FAILURE, { message, fonts })
    );

    export type Request = Readonly<ReturnType<typeof request>>;
    export type Success = Readonly<ReturnType<typeof success>>;
    export type Failure = Readonly<ReturnType<typeof failure>>;
    export type Result = Success | Failure;
}

type ReducerActions = LoadFontsAsync.Request | LoadFontsAsync.Result;
export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

interface Fonts {
    readonly [name: string]: any; // tslint:disable-line:no-any
}

// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    loading: false,
});

export const reducer = (store: Store = buildDefaultStore(), action?: ReducerActions): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.LOAD_FONTS_REQUEST:
            return { ...store, loading: true };
        case constants.LOAD_FONTS_SUCCESS:
            return { ...store, loading: false };
        case constants.LOAD_FONTS_FAILURE:
            return { ...store, loading: false };
        default:
            return store;
    }
};
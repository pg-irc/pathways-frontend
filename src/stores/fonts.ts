import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export namespace LoadFonts {
    export type Request = Readonly<ReturnType<typeof loadFontsActions.request>>;
    export type Success = Readonly<ReturnType<typeof loadFontsActions.success>>;
    export type Failure = Readonly<ReturnType<typeof loadFontsActions.failure>>;
    export type Result = Success | Failure;
}

type ReducerActions = LoadFonts.Request | LoadFonts.Result;
export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

interface Fonts {
    readonly [name: string]: any; // tslint:disable-line:no-any
}

// tslint:disable-next-line:typedef
export const buildDefaultStore = () => ({
    loading: false,
});

// TODO combine this class and namespace above into one
export const loadFontsActions = {
    // tslint:disable-next-line:typedef
    request(fonts: Fonts) {
        return helpers.makeAction(constants.LOAD_FONTS_REQUEST, { fonts });
    },
    // tslint:disable-next-line:typedef
    success(fonts: Fonts) {
        return helpers.makeAction(constants.LOAD_FONTS_SUCCESS, { fonts });
    },
    // tslint:disable-next-line:typedef
    failure(message: string, fonts: Fonts) {
        return helpers.makeAction(constants.LOAD_FONTS_FAILURE, { message, fonts });
    },
};

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
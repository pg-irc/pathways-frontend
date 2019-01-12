// tslint:disable:typedef

import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export namespace GetServerVersionAsync {

    export const request = () => (
        helpers.makeAction(constants.GET_SERVER_VERSION_REQUEST)
    );

    export const success = (version: string) => (
        helpers.makeAction(constants.GET_SERVER_VERSION_SUCCESS, { version })
    );

    export const failure = (message: string) => (
        helpers.makeAction(constants.GET_SERVER_VERSION_FAILURE, { message })
    );

    export type RequestAction = Readonly<ReturnType<typeof request>>;
    export type SuccessAction = Readonly<ReturnType<typeof success>>;
    export type FailureAction = Readonly<ReturnType<typeof failure>>;

    export type ResultAction = SuccessAction | FailureAction;
    export type Action = RequestAction | ResultAction;
}

export enum StoreState {
    Empty,
    Valid,
    Invalid,
}

export const buildDefaultStore = () => ({
    serverVersion: '',
    state: StoreState.Empty,
});

export type ServerVersionStore = Readonly<ReturnType<typeof buildDefaultStore>>;

export const reducer = (store: ServerVersionStore, action: GetServerVersionAsync.ResultAction): ServerVersionStore => {
    switch (action.type) {
        case constants.GET_SERVER_VERSION_SUCCESS:
            return {
                ...store,
                serverVersion: action.payload.version,
                state: StoreState.Valid,
            };
        case constants.GET_SERVER_VERSION_FAILURE:
            return {
                ...store,
                serverVersion: '',
                state: StoreState.Invalid,
            };
        default:
            return store;
    }
};

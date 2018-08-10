// tslint:disable:no-class no-expression-statement no-this

import { ValidStore } from '../../fixtures/types/questionnaire';
export { ValidStore } from '../../fixtures/types/questionnaire';

export class InvalidStore {
    constructor(lastValidState: ValidStore, error: string) {
        this.lastValidState = lastValidState;
        this.error = error;
    }
    readonly lastValidState: ValidStore;
    readonly error: string;
}

export class LoadingStore {
    constructor(lastValidState: ValidStore) {
        this.lastValidState = lastValidState;
    }
    readonly lastValidState: ValidStore;
}

export type Store = ValidStore | InvalidStore | LoadingStore;

export const toValidOrThrow = (store: Store): ValidStore => {
    if (store instanceof ValidStore) {
        return store;
    }
    throw new Error('Tried to access invalid questionnaire store');
};

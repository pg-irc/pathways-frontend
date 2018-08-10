// tslint:disable:no-class no-expression-statement no-this

import { ValidStore } from '../../fixtures/types/questionnaire';
export { ValidStore } from '../../fixtures/types/questionnaire';

export class InvalidStore {
    constructor(lastValidStore: ValidStore, error: string) {
        this.lastValidStore = lastValidStore;
        this.error = error;
    }
    readonly lastValidStore: ValidStore;
    readonly error: string;
}

export class LoadingStore {
    constructor(lastValidStore: ValidStore, percentDone: number) {
        this.lastValidStore = lastValidStore;
        this.percentDone = percentDone;
    }
    readonly lastValidStore: ValidStore;
    readonly percentDone: number;
}

export type Store = ValidStore | InvalidStore | LoadingStore;

export const toValidOrThrow = (store: Store): ValidStore => {
    if (store instanceof ValidStore) {
        return store;
    }
    throw new Error('Tried to access invalid questionnaire store');
};

// tslint:disable:no-class no-expression-statement no-this

import { Store } from '../../fixtures/types/questionnaire';
export { Store } from '../../fixtures/types/questionnaire';

export class InvalidStore {
    constructor(lastValidStore: Store, error: string) {
        this.lastValidStore = lastValidStore;
        this.error = error;
    }
    readonly lastValidStore: Store;
    readonly error: string;
}

export class LoadingStore {
    constructor(lastValidStore: Store, percentDone: number) {
        this.lastValidStore = lastValidStore;
        this.percentDone = percentDone;
    }
    readonly lastValidStore: Store;
    readonly percentDone: number;
}

// TODO rename Store to ValidStore and AnyTaggedStore to Store
export type AnyTaggedStore = Store | InvalidStore | LoadingStore;

export const toValidOrThrow = (store: AnyTaggedStore): Store => {
    if (store instanceof Store) {
        return store;
    }
    throw new Error('Tried to access invalid questionnaire store');
};

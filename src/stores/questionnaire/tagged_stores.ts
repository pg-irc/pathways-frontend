import { Store as ValidStore } from '../../fixtures/types/questionnaire';
export { Store as ValidStore } from '../../fixtures/types/questionnaire';
import { VALID_STORE_TAG, INVALID_STORE_TAG, LOADING_STORE_TAG } from '../../application/constants';
import { tagStore } from '../helpers/tagged_store';

// tslint:disable-next-line:typedef
export const tagAsValid = (store: ValidStore) => tagStore(VALID_STORE_TAG, store);

export type TaggedValidStore = Readonly<ReturnType<typeof tagAsValid>>;

export interface InvalidStore {
    readonly lastValidState: ValidStore;
}

// tslint:disable-next-line:typedef
export const tagAsInvalid = (store: InvalidStore) => tagStore(INVALID_STORE_TAG, store);

export type TaggedInvalidStore = Readonly<ReturnType<typeof tagAsInvalid>>;

export interface LoadingStore {
    readonly lastValidState: ValidStore;
}

// tslint:disable-next-line:typedef
export const tagAsLoading = (store: LoadingStore) => tagStore(LOADING_STORE_TAG, store);

export type TaggedLoadingStore = Readonly<ReturnType<typeof tagAsLoading>>;

export const toValidOrThrow = (store: AnyTaggedStore): ValidStore => {
    if (store.tag === VALID_STORE_TAG) {
        return store.store;
    }
    throw new Error('Tried to access invalid questionnaire store');
};

export type AnyTaggedStore = TaggedValidStore | TaggedInvalidStore | TaggedLoadingStore;

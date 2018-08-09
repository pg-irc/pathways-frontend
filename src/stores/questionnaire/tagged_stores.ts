import { Store as ValidStore } from '../../fixtures/types/questionnaire';
export { Store as ValidStore } from '../../fixtures/types/questionnaire';

export interface TaggedStore<T extends string, S> {
    readonly tag: T;
    readonly store: S;
}

function tagStore<T extends string, S>(tag: T, store: S): TaggedStore<T, S> {
    return { tag, store };
}

// TODO maybe just define a constant on the ValidStore type so we don't need to do the nesting?

export const VALID_STORE_TAG = 'VALID_STORE_TAG';
// tslint:disable-next-line:typedef
export const tagAsValidStore = (store: ValidStore) => tagStore(VALID_STORE_TAG, store);
export type TaggedValidStore = Readonly<ReturnType<typeof tagAsValidStore>>;

export interface InvalidStore { }
export const INVALID_STORE_TAG = 'ERROR_STORE_TAG';
// tslint:disable-next-line:typedef
export const tagAsInvalidStore = (store: InvalidStore) => tagStore(INVALID_STORE_TAG, store);
export type TaggedInvalidStore = Readonly<ReturnType<typeof tagAsInvalidStore>>;

export type Store = TaggedValidStore | TaggedInvalidStore;

export const unwrapValidStoreOrThrow = (store: Store): ValidStore => {
    if (store.tag === VALID_STORE_TAG) {
        return store.store;
    }
    throw new Error('Tried to access invalid questionnaire store');
};

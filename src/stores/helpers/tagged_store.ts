export interface TaggedStore<T extends string, S> {
    readonly tag: T;
    readonly store: S;
}

export function tagStore<TAG extends string, STORE>(tag: TAG, store: STORE): TaggedStore<TAG, STORE> {
    return { tag, store };
}

import { Store } from '../../stores';

export const selectIsSearchLoading = (appStore: Store): boolean => (
    appStore.search.isSearchLoading
);

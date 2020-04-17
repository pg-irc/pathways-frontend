import { Store } from '../../stores';

export const selectSearchIndex = (appStore: Store): number => {
    return appStore.search.searchIndex;
};

import { Store } from '../../stores';

export const selectSearchTerm = (appStore: Store): string => {
    return appStore.search.searchTerm;
};

import { Store } from '../../stores';
import { SearchServiceData } from '../../validation/search/types';

export const selectSearchResults = (appStore: Store): ReadonlyArray<SearchServiceData> => {
    return appStore.search.searchResults;
};

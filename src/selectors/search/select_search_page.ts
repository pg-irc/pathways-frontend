import { Store } from '../../stores';

export const selectSearchPage = (appStore: Store): number => {
    return appStore.search.searchPage;
};
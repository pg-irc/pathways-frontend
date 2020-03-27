import { Store } from '../../stores';

export const selectNumberOfSearchPages = (appStore: Store): number => {
    return appStore.search.numberOfSearchPages;
};
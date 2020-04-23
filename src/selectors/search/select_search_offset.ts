import { Store } from '../../stores';

export const selectSearchOffset = (appStore: Store): number => {
    return appStore.search.searchOffset;
};

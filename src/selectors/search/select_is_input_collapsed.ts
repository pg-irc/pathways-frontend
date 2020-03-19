import { Store } from '../../stores';

export const selectIsInputCollapsed = (appStore: Store): boolean => {
    return appStore.search.collapseSearchInput;
};

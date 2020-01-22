import { Store } from '../../stores';

export const selectSearchLocation = (appStore: Store): string => {
    return appStore.search.searchLocation;
};

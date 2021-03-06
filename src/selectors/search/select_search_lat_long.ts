import { Store } from '../../stores';
import { LatLong } from '../../validation/latlong/types';

export const selectSearchLatLong = (appStore: Store): LatLong => {
    return appStore.search.searchLatLong;
};

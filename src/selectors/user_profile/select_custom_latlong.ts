import { Store } from '../../stores';
import { LatLong } from '../../validation/latlong/types';

export const selectCustomLatLong = (appStore: Store): LatLong | undefined => {
    return appStore.userProfile.customLatLong;
};

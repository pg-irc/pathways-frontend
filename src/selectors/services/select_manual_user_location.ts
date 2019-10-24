import { Store } from '../../stores';
import { LatLong } from '../../validation/search/types';

export const selectManualUserLocation = (store: Store): LatLong | undefined => (
    store.manualUserLocation.userLocation
);

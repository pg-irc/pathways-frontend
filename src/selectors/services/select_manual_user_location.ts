import { Store } from '../../stores';
import { UserLocation } from '../../validation/latlong/types';

export const selectManualUserLocation = (store: Store): UserLocation => (
    store.manualUserLocation.userLocation
);

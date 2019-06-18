import { Store } from '../../stores';
import { LatLong } from '../../stores/manual_user_location';

export const selectManualUserLocation = (store: Store): LatLong | undefined => (
    store.manualUserLocation.userLocation
);

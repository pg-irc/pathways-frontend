import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Errors } from '../errors/types';
import { LatLong } from '../stores/manual_user_location';

export interface NoLocationPermissionError {
    readonly type: Errors.NoLocationPermission;
}

export interface LocationFetchTimeoutError {
    readonly type: Errors.LocationFetchTimeout;
}

type GetDeviceLocationReturnType = Promise<LocationData | NoLocationPermissionError | LocationFetchTimeoutError>;

export const getDeviceLocation = async (manualUserLocation?: LatLong): GetDeviceLocationReturnType => {
    try {
        if (manualUserLocation) {
            return buildManualUserLocation(manualUserLocation);
        }
        const permissions = await Permissions.askAsync(Permissions.LOCATION);
        if (permissions.status !== 'granted') {
            return buildNoLocationPermissionError();
        }
        return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low, timeout: 5000 });
    } catch (locationFetchTimeoutError) {
        return buildLocationFetchTimeoutError();
    }
};

const buildNoLocationPermissionError = (): NoLocationPermissionError => ({
    type: Errors.NoLocationPermission,
});

const buildLocationFetchTimeoutError = (): LocationFetchTimeoutError => ({
    type: Errors.LocationFetchTimeout,
});

const buildManualUserLocation = (manualUserLocation: LatLong): LocationData => ({
    coords: {
        latitude: manualUserLocation.latitude,
        longitude: manualUserLocation.longitude,
        altitude: 0,
        accuracy: 0,
        heading: 0,
        speed: 0,
    },
    timestamp: 0,
});
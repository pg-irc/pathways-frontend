import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { AsyncErrors } from './errors';
import { LatLong } from '../stores/manual_user_location';

export interface NoLocationPermissionError {
    readonly type: AsyncErrors.NoLocationPermission;
}

export interface LocationFetchTimeoutError {
    readonly type: AsyncErrors.LocationFetchTimeout;
}

type GetDeviceLocationReturnType = Promise<LocationData | NoLocationPermissionError | LocationFetchTimeoutError>;

export const getDeviceLocation = async (manualUserLocation?: LatLong): GetDeviceLocationReturnType => {
    try {
        if (manualUserLocation) {
            return {
                coords: {
                    latitude: manualUserLocation.latitude,
                    longitude: manualUserLocation.longitude,
                    altitude: 0,
                    accuracy: 0,
                    heading: 0,
                    speed: 0,
                },
                timestamp: 0,
            };
        }
        const permissions = await Permissions.askAsync(Permissions.LOCATION);
        if (permissions.status !== 'granted') {
            return buildNoLocationPermissionError();
        }
        return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low, timeout: 5000 });
    } catch (error) {
        return buildLocationFetchTimeoutError();
    }
};

const buildNoLocationPermissionError = (): NoLocationPermissionError => ({
    type: AsyncErrors.NoLocationPermission,
});

const buildLocationFetchTimeoutError = (): LocationFetchTimeoutError => ({
    type: AsyncErrors.LocationFetchTimeout,
});
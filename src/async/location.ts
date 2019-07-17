import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { AsyncLocationErrorType } from './error_types';
import { LatLong } from '../stores/manual_user_location';

export const isAsyncLocationError = (maybeLocation: LocationData | AsyncLocationError):
    maybeLocation is AsyncLocationError => (
        (<AsyncLocationError>maybeLocation).type === AsyncLocationErrorType.NoLocationPermission ||
        (<AsyncLocationError>maybeLocation).type === AsyncLocationErrorType.LocationFetchTimeout
    );

export const getLocationIfPermittedAsync = async (manualUserLocation?: LatLong): Promise<LocationData | AsyncLocationError> => {
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
            return buildNoLocationPermissionError('Location permission not granted');
        }
        return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low, timeout: 5000 });
    } catch (error) {
        return buildLocationFetchTimeoutError(error);
    }
};

interface AsyncLocationError {
    readonly type: AsyncLocationErrorType;
    readonly message: string;
}

const buildNoLocationPermissionError = (message: string): AsyncLocationError => ({
    type: AsyncLocationErrorType.NoLocationPermission,
    message,
});

const buildLocationFetchTimeoutError = (message: string): AsyncLocationError => ({
    type: AsyncLocationErrorType.LocationFetchTimeout,
    message,
});
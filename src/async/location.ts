import { Location, Permissions } from 'expo';
import { AsyncLocationErrorType } from './error_types';

export const isAsyncLocationError = (maybeLocation: LocationData | AsyncLocationError):
    maybeLocation is AsyncLocationError => (
        (<AsyncLocationError>maybeLocation).type === AsyncLocationErrorType.NoLocationPermission ||
        (<AsyncLocationError>maybeLocation).type === AsyncLocationErrorType.LocationFetchTimeout
    );

export const getLocationIfPermittedAsync = async (): Promise<LocationData | AsyncLocationError> => {
    try {
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
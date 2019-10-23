import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Errors } from '../validation/errors/types';
import { LatLong } from '../validation/search/types';

export type NoLocationPermissionErrorAction = Readonly<ReturnType<typeof noLocationPermissionError>>;

export type LocationFetchTimeoutErrorAction = Readonly<ReturnType<typeof noLocationFetchTimeoutError>>;

type GetDeviceLocationReturnType = Promise<DeviceLocationData | NoLocationPermissionErrorAction | LocationFetchTimeoutErrorAction>;

export const getDeviceLocation = async (manualUserLocation?: LatLong): GetDeviceLocationReturnType => {
    try {
        if (manualUserLocation) {
            return buildManualUserLocation(manualUserLocation);
        }
        const permissions = await Permissions.askAsync(Permissions.LOCATION);
        if (permissions.status !== 'granted') {
            return noLocationPermissionError();
        }
        return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low, timeout: 5000 });
    } catch (locationFetchTimeoutError) {
        return noLocationFetchTimeoutError();
    }
};

// tslint:disable-next-line:typedef
const noLocationPermissionError = () => ({
    type: Errors.NoLocationPermission,
});

// tslint:disable-next-line:typedef
const noLocationFetchTimeoutError = () => ({
    type: Errors.LocationFetchTimeout,
});

const buildManualUserLocation = (manualUserLocation: LatLong): DeviceLocationData => ({
    coords: {
        latitude: manualUserLocation.lat,
        longitude: manualUserLocation.lng,
        altitude: 0,
        accuracy: 0,
        heading: 0,
        speed: 0,
    },
    timestamp: 0,
});
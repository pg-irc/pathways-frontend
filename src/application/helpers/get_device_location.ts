import * as Location from 'expo-location';
import { Errors } from '../../validation/errors/types';
import { LatLong } from '../../validation/latlong/types';
import { requestLocationPermission } from './request_location_permission';

export type NoLocationPermissionErrorAction = Readonly<ReturnType<typeof noLocationPermissionError>>;

export type LocationFetchTimeoutErrorAction = Readonly<ReturnType<typeof noLocationFetchTimeoutError>>;

export type DeviceLocation = DeviceLocationData | NoLocationPermissionErrorAction | LocationFetchTimeoutErrorAction;

type DeviceLocationAsync = Promise<DeviceLocation>;

export const getDeviceLocation = async (manualUserLocation?: LatLong): DeviceLocationAsync => {
    try {
        if (manualUserLocation) {
            return buildManualUserLocation(manualUserLocation);
        }
        const permissionStatus = await requestLocationPermission();
        if (permissionStatus !== Location.PermissionStatus.GRANTED) {
            return noLocationPermissionError();
        }
        const deviceLocation = await Location.getLastKnownPositionAsync();
        if (!deviceLocation) {
            return Location.getCurrentPositionAsync();
        }
        return deviceLocation;
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

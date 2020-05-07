// tslint:disable:no-expression-statement
import { LatLong } from '../validation/latlong/types';
import { toGeoCoderLatLong } from '../validation/latlong';
import BuildUrl from 'build-url';
import { getDeviceLocation } from '../application/helpers/get_device_location';
import { isNoLocationPermissionError, isLocationFetchTimeoutError } from '../validation/errors/is_error';
import { MY_LOCATION } from '../application/constants';
import { isDeviceOnline } from '../application/helpers/is_device_online';

export const fetchLatLongFromLocation = async (location: string): Promise<LatLong> => {
    const isOnline = await isDeviceOnline();
    if (!isOnline) {
        return undefined;
    }
    if (isMyLocation(location)) {
        return fetchLatLongFromDevice();
    }
    if (locationIsNotEmpty(location)) {
        return fetchLatLongFromAddress(location);
    }
    return undefined;
};

const isMyLocation = (location: string): boolean => (
    location === MY_LOCATION
);

const locationIsNotEmpty = (location: string): boolean => (
    location !== ''
);

const fetchLatLongFromDevice = async (): Promise<LatLong> => {
    const deviceLocation = await getDeviceLocation();
    if (isNoLocationPermissionError(deviceLocation) || isLocationFetchTimeoutError(deviceLocation)) {
        return { lat: 0, lng: 0 };
    }
    return { lat: deviceLocation.coords.latitude, lng: deviceLocation.coords.longitude };
};

const fetchLatLongFromAddress = async (location: string): Promise<LatLong> => {
    const url = buildGeoCoderUrl(location);
    try {
        const geocoderResponse = await fetch(url);
        const responseText = await getTextIfValidOrThrow(geocoderResponse);
        const responseJSON = JSON.parse(responseText);
        const latlong = toGeoCoderLatLong(responseJSON);
        return latlong;
    } catch (Error) {
        return { lat: 0, lng: 0 };
    }
};

export const buildGeoCoderUrl = (location: string): string => (
    BuildUrl('https://geocoder.ca', {
        queryParams: {
            locate: location,
            json: '1',
        },
    })
);

export const getTextIfValidOrThrow = (response: Response): Promise<string> => {
    if (!response.ok) {
        throw new Error(`Invalid response ${JSON
            .stringify(response)}`);
    }
    return response.text();
};

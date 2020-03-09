// tslint:disable:no-expression-statement
import { useEffect } from 'react';
import { OnlineStatus, useOnlineStatus } from '../../../hooks/use_online_status';
import { LatLong } from '../../../validation/latlong/types';
import { toGeoCoderLatLong } from '../../../validation/latlong';
import BuildUrl from 'build-url';
import * as R from 'ramda';
import { getDeviceLocation, NoLocationPermissionErrorAction, LocationFetchTimeoutErrorAction } from '../../../async/location';
import * as errors from '../../../validation/errors/is_error';
import { SetIsLatLongLoading } from '../search_component';
import { MY_LOCATION } from '../../../application/constants';

export const useFetchLatLongFromLocation =
    (location: string, saveSearchLatLong: (searchLatLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading): void => {
        const onlineStatus = useOnlineStatus();
        useEffect(
            () => fetchLatLongFromLocation(location, onlineStatus, saveSearchLatLong, setIsLatLongLoading),
            [onlineStatus, location],
        );
    };

const fetchLatLongFromLocation =
    (location: string, onlineStatus: OnlineStatus, saveSearchLatLong: (searchLatLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading)
    : void => {
        if (location === '') {
            saveSearchLatLong(undefined);
            setIsLatLongLoading(false);
        } else if (location === MY_LOCATION) {
            setIsLatLongLoading(true);
            fetchLatLongFromDevice(saveSearchLatLong, setIsLatLongLoading);
        } else if (location !== '' && onlineStatus === OnlineStatus.Online) {
            setIsLatLongLoading(true);
            fetchLatLongFromAddress(location, saveSearchLatLong, setIsLatLongLoading);
        }
    };

const fetchLatLongFromDevice = (saveSearchLatLong: (searchLatLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading): void => {
    getDeviceLocation().then((location: DeviceLocationData | NoLocationPermissionErrorAction | LocationFetchTimeoutErrorAction): void => {
        if (errors.isNoLocationPermissionError(location)) {
            saveSearchLatLong({ lat: 0, lng: 0 });
        } else if (errors.isLocationFetchTimeoutError(location)) {
            saveSearchLatLong({ lat: 0, lng: 0 });
        } else {
            saveSearchLatLong({ lat: location.coords.latitude, lng: location.coords.longitude });
        }
        setIsLatLongLoading(false);
    });
};

const fetchLatLongFromAddress = (location: string, saveSearchLatLong: (searchLatLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading): void => {
    const url = buildGeoCoderUrl(location);
    fetch(url).
        then(getTextIfValidOrThrow).
        then(JSON.parse).
        then(toGeoCoderLatLong).
        then(saveSearchLatLong).
        then((): void => setIsLatLongLoading(false)).
        catch(handleError(saveSearchLatLong));
};

const buildGeoCoderUrl = (location: string): string => (
    BuildUrl('https://geocoder.ca', {
        queryParams: {
            locate: location,
            json: '1',
        },
    })
);

const getTextIfValidOrThrow = (response: Response): Promise<string> => {
    if (!response.ok) {
        throw new Error(`Invalid response ${JSON.stringify(response)}`);
    }
    return response.text();
};

const handleError = R.curry((saveSearchLatLong: (searchLatLong: LatLong) => void, _: string): void => {
    saveSearchLatLong({ lat: 0, lng: 0 });
});

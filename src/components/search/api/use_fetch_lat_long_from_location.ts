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

export const useFetchLatLongFromLocation =
(location: string, setLatLong: (latLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading): void => {
    const onlineStatus = useOnlineStatus();
    useEffect(
        () => fetchLatLongFromLocation(location, onlineStatus, setLatLong, setIsLatLongLoading),
        [onlineStatus, location],
    );
};

const fetchLatLongFromLocation =
(location: string, onlineStatus: OnlineStatus, setLatLong: (latLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading): void => {
    if (location === 'Near My Location') {
        setIsLatLongLoading(true);
        fetchLatLongFromDevice(setLatLong, setIsLatLongLoading);
    } else if (location !== '' && onlineStatus === OnlineStatus.Online) {
        setIsLatLongLoading(true);
        fetchLatLongFromAddress(location, setLatLong, setIsLatLongLoading);
    }
};

const fetchLatLongFromDevice = (setLatLong: (latLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading): void => {
    getDeviceLocation().then((location: DeviceLocationData | NoLocationPermissionErrorAction | LocationFetchTimeoutErrorAction): void => {
        if (errors.isNoLocationPermissionError(location)) {
            setLatLong({ lat: 0, lng: 0 });
        } else if (errors.isLocationFetchTimeoutError(location)) {
            setLatLong({ lat: 0, lng: 0 });
        } else {
            setLatLong({ lat: location.coords.latitude, lng: location.coords.longitude });
        }
        setIsLatLongLoading(false);
    });
};

const fetchLatLongFromAddress = (location: string, setLatLong: (latLong: LatLong) => void, setIsLatLongLoading: SetIsLatLongLoading): void => {
    const url = buildGeoCoderUrl(location);
    fetch(url).
        then(getTextIfValidOrThrow).
        then(JSON.parse).
        then(toGeoCoderLatLong).
        then(setLatLong).
        catch(handleError(setLatLong));
    setIsLatLongLoading(false);
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

const handleError = R.curry((setLatLong: (latLong: LatLong) => void, _: string): void => {
    setLatLong({lat: 0, lng: 0});
});

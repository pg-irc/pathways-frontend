// tslint:disable:no-expression-statement
import { useEffect } from 'react';
import { OnlineStatus, useOnlineStatus } from '../../../hooks/use_online_status';
import { LatLong } from '../../../validation/geocoder/types';
import { toGeoCoderLatLong } from '../../../validation/geocoder';
import BuildUrl from 'build-url';
import * as R from 'ramda';
import { debug } from '../../../helpers/debug';

export const useFetchLatLongFromLocation = (location: string, setLatLong: (latLong: LatLong) => void): void => {
    const onlineStatus = useOnlineStatus();
    useEffect(() => fetchLatLongFromLocation(location, onlineStatus, setLatLong), [onlineStatus, location]);
};

const fetchLatLongFromLocation = (location: string, onlineStatus: OnlineStatus, setLatLong: (latLong: LatLong) => void): void => {
    if (location !== '' && onlineStatus === OnlineStatus.Online) {
        debug(`using fetchLatLongFromAddress with ${location}`);
        fetchLatLongFromAddress(location, setLatLong);
    }
};

const fetchLatLongFromAddress = (location: string, setLatLong: (latLong: LatLong) => void): void => {
    const url = buildUrl(location);
    fetch(url).
        then(getTextIfValidOrThrow).
        then(JSON.parse).
        then(toGeoCoderLatLong).
        then(setLatLong).
        catch(handleError(setLatLong));
};

const buildUrl = (location: string): string => (
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

const handleError = R.curry((setLatLong: (latLong: LatLong) => void, error: string): void => {
    console.log(`LatLong set to undefined: ${error}`);
    setLatLong(undefined);
});

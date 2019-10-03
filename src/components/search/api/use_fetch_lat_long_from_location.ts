// tslint:disable:no-expression-statement
import { useEffect } from 'react';
import { OnlineStatus, useOnlineStatus } from '../../../hooks/use_online_status';
import { LatLong } from '../types';
import { toGeoCoderLatLong } from './validation';
import BuildUrl from 'build-url';
import * as R from 'ramda';
import { debug } from '../../../helpers/debug';

export const useFetchLatLongFromLocation = (location: string, setLatLong: (latLong: LatLong) => void): void => {
    const onlineStatus = useOnlineStatus();
    useEffect(() => fetchLatLongFromAddress(location, onlineStatus, setLatLong), [onlineStatus, location]);
};

const fetchLatLongFromAddress = (location: string, onlineStatus: OnlineStatus, setLatLong: (latLong: LatLong) => void): void => {
    if (location !== '' && onlineStatus === OnlineStatus.Online) {
        debug(`using fetchLatLongFromAddress with ${location}`);
        const url = buildUrl(location);
        fetch(url).
            then(getTextIfValidOrThrow).
            then(JSON.parse).
            then(toGeoCoderLatLong).
            then(setLatLong).
            catch(handleError(setLatLong));
    }
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

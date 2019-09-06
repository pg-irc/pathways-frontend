// tslint:disable:no-expression-statement
import { useEffect } from 'react';
import { OnlineStatus, useOnlineStatus } from '../../hooks/use_online_status';
import { LatLong } from './types';
import { toGeoCoderLatLong } from './validation';
import * as R from 'ramda';

export const useFetchLatLongFromLocation = (location: string, setLatLong: (latLong: LatLong) => void): void => {
    const onlineStatus = useOnlineStatus();
    useEffect(() => fetchLatLongFromAddress(location, onlineStatus, setLatLong), [onlineStatus, location]);
};

export const fetchLatLongFromAddress = (location: string, onlineStatus: OnlineStatus, setLatLong: (latLong: LatLong) => void): void => {
    if (location !== '' && onlineStatus === OnlineStatus.Online) {
        const url = `https://geocoder.ca/?locate=${location}&json=1`;
        fetch(url).
            then(getTextIfValidOrThrow).
            then(JSON.parse).
            then(toGeoCoderLatLong).
            then(setLatLong).
            catch(handleError(setLatLong));
    }
};

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

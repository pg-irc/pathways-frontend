// tslint:disable:no-expression-statement
import { OnlineStatus } from '../../hooks/use_online_status';
import { LatLong } from './types';
import { toGeoCoderLatLong } from './validation';
import * as R from 'ramda';

export const fetchLatLongFromAddress = (address: string, onlineStatus: OnlineStatus, setLatLong: (latLong: LatLong) => void): void => {
    if (address !== '' && onlineStatus === OnlineStatus.Online) {
        const url = `https://geocoder.ca/?locate=${address}&json=1`;

        fetch(url).
            then(toValidStringOrThrow).
            then(JSON.parse).
            then(toGeoCoderLatLong).
            then(setLatLong).
            catch(setValueToUndefined(setLatLong));
    }
};

const toValidStringOrThrow = (response: Response): Promise<string> => {
    if (!response.ok) {
        throw new Error(`Invalid response ${JSON.stringify(response)}`);
    }
    return response.text();
};

const setValueToUndefined = R.curry((setLatLong: (latLong: LatLong) => void, error: string): void => {
    console.log(`LatLong set to undefined: ${error}`);
    setLatLong(undefined);
});

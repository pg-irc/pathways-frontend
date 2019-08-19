// tslint:disable:no-expression-statement
import { useEffect } from 'react';
import { deviceIsOnline } from '../async/network';

export const useDeviceIsOnline = (isOnlineCallback: (isOnline: boolean) => void): void => {
    useEffect(() => {
        deviceIsOnline().then((isOnline: boolean) => isOnlineCallback(isOnline));
    });
};
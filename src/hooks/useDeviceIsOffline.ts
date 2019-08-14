// tslint:disable:no-expression-statement
import { useEffect } from 'react';
import { deviceIsOffline } from '../async/network';

export const useDeviceIsOffline = (isOfflineCallback: (isOffline: boolean) => void): void => {
    useEffect(() => {
        deviceIsOffline().then((isOffline: boolean) => isOfflineCallback(isOffline));
    });
};
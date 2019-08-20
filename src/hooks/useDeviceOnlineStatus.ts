// tslint:disable:no-expression-statement
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { deviceIsOnline } from '../async/network';

export enum OnlineStatus {
    Loading,
    Online,
    Offline,
}

type SetIsOnline = Dispatch<SetStateAction<OnlineStatus>>;

export const useDeviceOnlineStatus = (): OnlineStatus => {
    const [onlineStatus, setOnlineStatus]: [OnlineStatus, SetIsOnline] = useState(OnlineStatus.Loading);
    useEffect(() => {
        deviceIsOnline().then((online: boolean) => {
            online ? setOnlineStatus(OnlineStatus.Online) : setOnlineStatus(OnlineStatus.Offline);
        });
    });

    return onlineStatus;
};
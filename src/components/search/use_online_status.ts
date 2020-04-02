// tslint:disable:no-expression-statement
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { isDeviceOnline } from '../../application/helpers/is_device_online';

export enum OnlineStatus {
    Loading,
    Online,
    Offline,
}

const toStatus = (online: boolean): OnlineStatus => (online ? OnlineStatus.Online : OnlineStatus.Offline);

type SetOnlineStatus = Dispatch<SetStateAction<OnlineStatus>>;

export const useOnlineStatus = (): OnlineStatus => {
    const [onlineStatus, setOnlineStatus]: [OnlineStatus, SetOnlineStatus] = useState(OnlineStatus.Loading);
    useEffect(() => { isDeviceOnline().then((isOnline: boolean) => setOnlineStatus(toStatus(isOnline))); });
    return onlineStatus;
};

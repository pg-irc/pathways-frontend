// tslint:disable:no-expression-statement
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { OnlineStatus, useOnlineStatus } from './use_online_status';

type Timestamp = number;
type TimestampSetter = Dispatch<SetStateAction<Timestamp>>;

export const useRequestDataIfOnlineReturnRefreshDataCallback = (requestDataCallback: () => void): () => void => {
    const onlineStatus = useOnlineStatus();
    const [lastRefresh, setLastRefresh]: [Timestamp, TimestampSetter] = useState(Date.now());
    useEffect(() => requestDataIfOnline(requestDataCallback, onlineStatus), [onlineStatus, lastRefresh]);
    return (): void => setLastRefresh(Date.now());
};

const requestDataIfOnline = (requestDataCallback: () => void, onlineStatus: OnlineStatus): void => {
    if (onlineStatus === OnlineStatus.Online) {
        requestDataCallback();
    }
};

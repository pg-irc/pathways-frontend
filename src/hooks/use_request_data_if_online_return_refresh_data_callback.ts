// tslint:disable:no-expression-statement
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { OnlineStatus } from './use_online_status';

type Timestamp = number;
type TimestampSetter = Dispatch<SetStateAction<Timestamp>>;

export const useRequestDataIfOnlineReturnRefreshDataCallback = (onlineStatus: OnlineStatus, requestDataCallback: () => void): () => void => {
    const [lastRefresh, setLastRefresh]: [Timestamp, TimestampSetter] = useState(Date.now());
    useEffect(() => requestDataIfOnline(requestDataCallback, onlineStatus), [onlineStatus, lastRefresh]);
    return (): void => setLastRefresh(Date.now());
};

const requestDataIfOnline = (requestDataCallback: () => void, onlineStatus: OnlineStatus): void => {
    if (onlineStatus === OnlineStatus.Online) {
        requestDataCallback();
    }
};

import { useState, Dispatch, SetStateAction } from 'react';

export type Timestamp = number;

export const useRefreshScreenState = (): [Timestamp, () => void] => {
    const [lastRefresh, setLastRefresh]: [Timestamp, Dispatch<SetStateAction<Timestamp>>] = useState(Date.now());
    const setLastRefreshToNow = (): void => setLastRefresh(Date.now());
    return [lastRefresh, setLastRefreshToNow];
};

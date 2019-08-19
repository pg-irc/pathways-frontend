import { useState, Dispatch, SetStateAction } from 'react';

export type TimeStamp = number;

export const useRefreshScreen = (): [TimeStamp, () => void] => {
    const [lastRefresh, setLastRefresh]: [TimeStamp, Dispatch<SetStateAction<TimeStamp>>] = useState(Date.now());
    return [lastRefresh, (): void => setLastRefresh(Date.now())];
};
import { useState, Dispatch, SetStateAction } from 'react';

export type UseRefreshScreen = [number, () => void];

export const useRefreshScreen = (): UseRefreshScreen => {
    const [lastRefresh, setLastRefresh]: [number, Dispatch<SetStateAction<number>>] = useState(Date.now());
    const setLastRefreshToNow = (): void => setLastRefresh(Date.now());
    return [lastRefresh, setLastRefreshToNow];
};
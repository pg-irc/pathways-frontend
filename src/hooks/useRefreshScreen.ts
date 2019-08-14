import { useState, Dispatch, SetStateAction } from 'react';

export const useRefreshScreen = (): () => void => {
    const [, setLastRefresh]: [number, Dispatch<SetStateAction<number>>] = useState(Date.now());
    return (): void => setLastRefresh(Date.now());
};
// tslint:disable: no-expression-statement
import { Location } from 'history';
import { useEffect } from 'react';

// tslint:disable-next-line: no-any
export const useCurrentOffsetFromLocationForScroll = (location: Location<any>, listOffsetSetter: (n: number) => void): void => {
    useEffect((): void => {
        listOffsetSetter(location.state?.currentOffset || 0);
    }, [location.state]);
};
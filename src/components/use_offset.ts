import { useState } from 'react';
import { useLocation as useRouteLocation } from 'react-router-native';

export type NumberSetter = (n: number) => void;

export interface OffsetHook {
    readonly offset: number;
    readonly offsetFromRouteLocation: number;
    readonly setOffset: NumberSetter;
}

export const useOffset = (): OffsetHook => {
    const routeLocation = useRouteLocation();
    const offsetFromRouteLocation = routeLocation.state?.currentOffset || 0;
    const [offset, setOffset]: readonly [number, NumberSetter] = useState(offsetFromRouteLocation);
    return {
        offset,
        setOffset,
        offsetFromRouteLocation,
    };
};
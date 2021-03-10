import { Location as RouteLocation } from 'history';
import { useState } from 'react';
import { useLocation as useRouteLocation } from 'react-router-native';

export type NumberSetter = (n: number) => void;

export interface OffsetHook {
    readonly offset: number;
    readonly offsetFromRouteLocation: number;
    readonly setOffset: NumberSetter;
}

// tslint:disable-next-line: no-any
export const setOffsetFromRouteLocation = (routeLocation: RouteLocation<any>): number => (
    routeLocation.state?.currentOffset || 0
);

export const useOffset = (): OffsetHook => {
    const routeLocation = useRouteLocation();
    const offsetFromRouteLocation = setOffsetFromRouteLocation(routeLocation);
    const [offset, setOffset]: readonly [number, NumberSetter] = useState(offsetFromRouteLocation);
    return {
        offset,
        setOffset,
        offsetFromRouteLocation,
    };
};
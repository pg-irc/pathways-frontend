import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export interface LatLong {
    readonly longitude: number;
    readonly latitude: number;
}

// tslint:disable-next-line:typedef
export const setLocation = (latlong: LatLong) => (
    helpers.makeAction(constants.SET_LOCATION, { latlong })
);

// tslint:disable-next-line:typedef
export const clearLocation = () => (
    helpers.makeAction(constants.CLEAR_LOCATION)
);

export type SetLocationAction = Readonly<ReturnType<typeof setLocation>>;
export type ClearLocationAction = Readonly<ReturnType<typeof clearLocation>>;

export interface LocationStore {
    readonly latlong?: LatLong;
}

export const buildDefaultStore = (): LocationStore => (
    {}
);

type LocationActions = SetLocationAction | ClearLocationAction;

export const reducer = (store: LocationStore = buildDefaultStore(), action?: LocationActions): LocationStore => {
    if (!action) {
        return store;
    }
    if (action.type === constants.SET_LOCATION) {
        return { ...store, latlong: action.payload.latlong };
    }
    if (action.type === constants.CLEAR_LOCATION) {
        return { ...store, latlong: undefined };
    }
    return store;
};

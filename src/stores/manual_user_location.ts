import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { UserLocation } from '../validation/latlong/types';

// tslint:disable-next-line:typedef
export const setManualUserLocation = (userLocation: UserLocation) => (
    helpers.makeAction(constants.SET_MANUAL_USER_LOCATION, { userLocation })
);

// tslint:disable-next-line:typedef
export const clearManualUserLocation = () => (
    helpers.makeAction(constants.CLEAR_MANUAL_USER_LOCATION)
);

export type SetManualUserLocationAction = Readonly<ReturnType<typeof setManualUserLocation>>;
export type ClearManualUserLocationAction = Readonly<ReturnType<typeof clearManualUserLocation>>;

export interface ManualUserLocationStore {
    readonly userLocation: UserLocation;
}

export const buildDefaultStore = (): ManualUserLocationStore => ({
    userLocation: {
        label: '',
        latLong: undefined,
    },
});

type Actions = SetManualUserLocationAction | ClearManualUserLocationAction;

export const reducer = (store: ManualUserLocationStore = buildDefaultStore(), action?: Actions): ManualUserLocationStore => {
    if (!action) {
        return store;
    }
    if (action.type === constants.SET_MANUAL_USER_LOCATION) {
        return { ...store, userLocation: action.payload.userLocation };
    }
    if (action.type === constants.CLEAR_MANUAL_USER_LOCATION) {
        return buildDefaultStore();
    }
    return store;
};

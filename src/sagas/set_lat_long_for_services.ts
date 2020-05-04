// tslint:disable: no-expression-statement
import { ForkEffect, takeLatest, put, CallEffect, PutEffect, SelectEffect, call } from 'redux-saga/effects';
import { SET_LAT_LONG_FOR_SERVICES } from '../application/constants';
import { SetLatLongForServicesAction } from '../stores/services/actions';
import { setManualUserLocation } from '../stores/manual_user_location';
import { fetchLatLongFromLocation } from '../api/fetch_lat_long_from_location';
import { isDeviceOnline } from '../application/helpers/is_device_online';

export function* watchSetLatLongForServices(): IterableIterator<ForkEffect> {
    yield takeLatest(SET_LAT_LONG_FOR_SERVICES, setLatLongForServices);
}

type Effects = CallEffect | PutEffect | SelectEffect;

export function* setLatLongForServices(action: SetLatLongForServicesAction): IterableIterator<Effects> {
    const isOnline = yield call(isDeviceOnline);
    const location = action.payload.location;
    try {
        const latLong = yield call(fetchLatLongFromLocation, location, isOnline);
        yield put(setManualUserLocation(
            {
                label: location,
                latLong,
            },
        ));
    } catch (error) {
        yield put(setManualUserLocation(
            {
                label: action.payload.location,
                latLong: { lat: 0, lng: 0 },
            },
        ));
    }
}

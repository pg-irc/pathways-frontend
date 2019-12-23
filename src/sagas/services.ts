// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put, select, SelectEffect } from 'redux-saga/effects';
import * as constants from '../application/constants';
import * as actions from '../stores/services/actions';
import { validateServicesAtLocationArray, toServicesFromValidatedJSONAndStore } from '../validation/services';
import { searchServices, APIResponse } from '../api';
import { getDeviceLocation, DeviceLocation } from '../async/location';
import * as errors from '../validation/errors/is_error';
import { Errors } from '../validation/errors/types';
import { HumanServiceData } from '../validation/services/types';
import { selectBookmarkedServicesIds } from '../selectors/services/select_bookmarked_services_ids';
import { deviceIsOnline } from '../async/network';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export function* updateTaskServices(action: actions.BuildServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const isOnline = yield call(deviceIsOnline);

        if (!isOnline) {
            return yield put(actions.buildServicesError(topicId, Errors.Offline));
        }

        const deviceLocationResponse: DeviceLocation = yield call(getDeviceLocation, action.payload.manualUserLocation);

        if (errors.isNoLocationPermissionError(deviceLocationResponse)) {
            return yield put(actions.buildServicesError(topicId, deviceLocationResponse.type));
        }

        if (errors.isLocationFetchTimeoutError(deviceLocationResponse)) {
            return yield put(actions.buildServicesError(topicId, deviceLocationResponse.type));
        }

        const apiResponse: APIResponse = yield call(searchServices, topicId, deviceLocationResponse);
        if (errors.isBadResponseError(apiResponse)) {
            return yield put(actions.buildServicesError(topicId, Errors.BadServerResponse));
        }

        const validatedApiResponse = validateServicesAtLocationArray(apiResponse.results);
        if (!validatedApiResponse.isValid) {
            return yield put(actions.buildServicesError(topicId, Errors.InvalidServerData));
        }

        const bookmarkedServicesIds = yield select(selectBookmarkedServicesIds);
        const services = yield toServicesFromValidatedJSONAndStore(validatedApiResponse.validData, bookmarkedServicesIds);
        yield put(actions.buildServicesSuccess(topicId, services));
    } catch (error) {
        yield put(actions.buildServicesError(topicId, Errors.Exception));
    }
}

type SuccessOrFailureResult = actions.BuildServicesSuccessAction | actions.BuildServicesErrorAction;

type UpdateResult = IterableIterator<ReadonlyArray<HumanServiceData> | SelectEffect | CallEffect | PutEffect<SuccessOrFailureResult>>;

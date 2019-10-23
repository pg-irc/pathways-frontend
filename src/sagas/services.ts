// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import {
    BuildServicesRequestAction, BuildServicesSuccessAction, BuildServicesErrorAction,
    buildServicesSuccessAction, buildServicesErrorAction,
} from '../stores/services/actions';
import { validateServicesAtLocationArray } from '../validation/services';
import { searchServices, APIResponse } from '../api';
import { getDeviceLocation } from '../async/location';
import {
    isNoLocationPermissionError,
    isLocationFetchTimeoutError,
    isBadResponseError,
} from '../validation/errors/is_error';
import { Errors } from '../validation/errors/types';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export function* updateTaskServices(action: BuildServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const deviceLocationResponse = yield call(getDeviceLocation, action.payload.manualUserLocation);

        if (isNoLocationPermissionError(deviceLocationResponse)) {
            return yield put(buildServicesErrorAction(topicId, deviceLocationResponse.type));
        }

        if (isLocationFetchTimeoutError(deviceLocationResponse)) {
            return yield put(buildServicesErrorAction(topicId, deviceLocationResponse.type));
        }

        const response: APIResponse = yield call(searchServices, topicId, deviceLocationResponse);
        if (isBadResponseError(response)) {
            return yield put(buildServicesErrorAction(topicId, Errors.BadServerResponse));
        }

        // TODO refactor the search client code to follow the same pattern
        const validationResult = validateServicesAtLocationArray(response.results);
        if (!validationResult.isValid) {
            return yield put(buildServicesErrorAction(topicId, Errors.InvalidServerData));
        }

        yield put(buildServicesSuccessAction(topicId, validationResult.validData));

    } catch (error) {
        yield put(buildServicesErrorAction(topicId, Errors.Exception));
    }
}

type SuccessOrFailureResult = BuildServicesSuccessAction | BuildServicesErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;

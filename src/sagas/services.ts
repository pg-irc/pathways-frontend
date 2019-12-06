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
import { selectSavedServicesIds } from '../selectors/services/select_saved_services_ids';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export function* updateTaskServices(action: actions.BuildServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const deviceLocationResponse: DeviceLocation = yield call(getDeviceLocation, action.payload.manualUserLocation);

        if (errors.isNoLocationPermissionError(deviceLocationResponse)) {
            return yield put(actions.buildServicesErrorAction(topicId, deviceLocationResponse.type));
        }

        if (errors.isLocationFetchTimeoutError(deviceLocationResponse)) {
            return yield put(actions.buildServicesErrorAction(topicId, deviceLocationResponse.type));
        }

        const apiResponse: APIResponse = yield call(searchServices, topicId, deviceLocationResponse);
        if (errors.isBadResponseError(apiResponse)) {
            return yield put(actions.buildServicesErrorAction(topicId, Errors.BadServerResponse));
        }

        const validatedApiResponse = validateServicesAtLocationArray(apiResponse.results);
        if (!validatedApiResponse.isValid) {
            return yield put(actions.buildServicesErrorAction(topicId, Errors.InvalidServerData));
        }

        const savedServicesIds = yield select(selectSavedServicesIds);
        const services = yield toServicesFromValidatedJSONAndStore(validatedApiResponse.validData, savedServicesIds);
        yield put(actions.buildServicesSuccessAction(topicId, services));
    } catch (error) {
        yield put(actions.buildServicesErrorAction(topicId, Errors.Exception));
    }
}

type SuccessOrFailureResult = actions.BuildServicesSuccessAction | actions.BuildServicesErrorAction;

type UpdateResult = IterableIterator<ReadonlyArray<HumanServiceData> | SelectEffect | CallEffect | PutEffect<SuccessOrFailureResult>>;

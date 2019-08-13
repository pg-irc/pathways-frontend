// tslint:disable:no-expression-statement
import * as R from 'ramda';
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import {
    SendTopicServicesRequestAction, PopulateTopicServicesFromSuccessAction,
    populateTopicServicesFromSuccess, PopulateTopicServicesFromErrorAction, populateTopicServicesFromError,
    serviceFromValidatedJSON,
} from '../stores/services';
import { searchServices, APIResponse } from '../api';
import { servicesAtLocationValidator } from '../json_schemas/validators';
import { getDeviceLocation } from '../async/location';
import {
    isNoLocationPermissionError,
    isLocationFetchTimeoutError,
    isBadServerResponseError,
    isInvalidServerDataError,
} from '../async/is_error';
import { AsyncErrors } from '../async/errors';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export type ServicesErrorType = AsyncErrors;

export function* updateTaskServices(action: SendTopicServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const maybeLocation = yield call(getDeviceLocation, action.payload.manualUserLocation);
        if (isNoLocationPermissionError(maybeLocation)) {
            return yield put(
                populateTopicServicesFromError(topicId, maybeLocation.type),
            );
        }
        if (isLocationFetchTimeoutError(maybeLocation)) {
            return yield put(
                populateTopicServicesFromError(topicId, maybeLocation.type),
            );
        }
        const response: APIResponse = yield call(searchServices, topicId, maybeLocation);
        if (isBadServerResponseError(response)) {
            return yield put(
                populateTopicServicesFromError(topicId, AsyncErrors.BadServerResponse),
            );
        }
        const validator = servicesAtLocationValidator(response.results);
        if (isInvalidServerDataError(validator)) {
            return yield put(
                populateTopicServicesFromError(topicId, AsyncErrors.InvalidServerData),
            );
        }
        yield put(
            populateTopicServicesFromSuccess(topicId, R.map(serviceFromValidatedJSON, response.results)),
        );
    } catch (error) {
        yield put(
            populateTopicServicesFromError(topicId, AsyncErrors.Exception),
        );
    }
}

type SuccessOrFailureResult = PopulateTopicServicesFromSuccessAction | PopulateTopicServicesFromErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;

// tslint:disable:no-expression-statement
import * as R from 'ramda';
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import {
    BuildTopicServicesRequestAction, BuildTopicServicesSuccessAction, BuildTopicServicesErrorAction,
    buildTopicServicesSuccessAction, buildTopicServicesErrorAction,
} from '../stores/services/actions';
import { serviceFromValidatedJSON, validateServicesAtLocationArray, ValidatedServiceAtLocationJSON } from '../validation/services';
import { searchServices, APIResponse } from '../api';
import { getDeviceLocation } from '../async/location';
import {
    isNoLocationPermissionError,
    isLocationFetchTimeoutError,
    isBadResponseError,
    isInvalidResponseData,
} from '../validation/errors/is_error';
import { Errors } from '../validation/errors/types';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export function* updateTaskServices(action: BuildTopicServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const maybeLocation = yield call(getDeviceLocation, action.payload.manualUserLocation);
        if (isNoLocationPermissionError(maybeLocation)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, maybeLocation.type),
            );
        }
        if (isLocationFetchTimeoutError(maybeLocation)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, maybeLocation.type),
            );
        }
        const response: APIResponse = yield call(searchServices, topicId, maybeLocation);
        if (isBadResponseError(response)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, Errors.BadServerResponse),
            );
        }
        // TODO refactor to give a validator function that takes an any and returns a ValidatedServiceAtLocationJSON
        // TODO refactor to remove the HumanServiceData data and use ValidatedServiceAtLocationJSON instead
        // TODO refactor to rename ValidatedServiceAtLocationJSON to HumanServiceData, this means that the
        //          client DTO will need to match the wire format exactly
        // TODO refactor the search client code to follow the same pattern
        const validator = validateServicesAtLocationArray(response.results);
        if (isInvalidResponseData(validator)) {
            return yield put(
                buildTopicServicesErrorAction(topicId, Errors.InvalidServerData),
            );
        }
        const validatedResults: ValidatedServiceAtLocationJSON = response.results;
        yield put(
            buildTopicServicesSuccessAction(topicId, R.map(serviceFromValidatedJSON, validatedResults)),
        );
    } catch (error) {
        yield put(
            buildTopicServicesErrorAction(topicId, Errors.Exception),
        );
    }
}

type SuccessOrFailureResult = BuildTopicServicesSuccessAction | BuildTopicServicesErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;

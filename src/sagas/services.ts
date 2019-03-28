// tslint:disable:no-expression-statement
import * as R from 'ramda';
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import {
    SendTaskServicesRequestAction, PopulateTaskServicesFromSuccessAction,
    populateTaskServicesFromSuccess, PopulateTaskServicesFromErrorAction, populateTaskServicesFromError,
    serviceFromValidatedJSON,
} from '../stores/services';
import { API, isResponseError, APIResponse } from '../api';
import { servicesAtLocationValidator, isValidationError } from '../json_schemas/validators';
import { isAsyncLocationError, getLocationIfPermittedAsync } from '../async/location';
import { AsyncGenericErrorType, AsyncLocationErrorType } from '../async/error_types';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export type ServicesErrorType = AsyncGenericErrorType | AsyncLocationErrorType;

export function* updateTaskServices(action: SendTaskServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const maybeLocation = yield call(getLocationIfPermittedAsync);
        if (isAsyncLocationError(maybeLocation)) {
            return yield put(
                populateTaskServicesFromError(maybeLocation.message, topicId, maybeLocation.type),
            );
        }
        const response: APIResponse = yield call([API, API.searchServices], topicId, maybeLocation);
        if (isResponseError(response)) {
            return yield put(
                populateTaskServicesFromError(response.message, topicId, AsyncGenericErrorType.BadServerResponse),
            );
        }
        const validator = servicesAtLocationValidator(response.results);
        if (isValidationError(validator)) {
            return yield put(
                populateTaskServicesFromError(validator.errors, topicId, AsyncGenericErrorType.ValidationFailure),
            );
        }
        yield put(
            populateTaskServicesFromSuccess(topicId, R.map(serviceFromValidatedJSON, response.results)),
        );
    } catch (error) {
        yield put(
            populateTaskServicesFromError(error.message, topicId, AsyncGenericErrorType.Exception),
        );
    }
}

type SuccessOrFailureResult = PopulateTaskServicesFromSuccessAction | PopulateTaskServicesFromErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;

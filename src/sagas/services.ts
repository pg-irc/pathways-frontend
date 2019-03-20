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
    const taskId = action.payload.taskId;
    try {
        const maybeLocation = yield call(getLocationIfPermittedAsync);
        if (isAsyncLocationError(maybeLocation)) {
            return yield put(
                populateTaskServicesFromError(maybeLocation.message, taskId, maybeLocation.type)
            );
        }
        const response: APIResponse = yield call([API, API.searchServices], taskId, maybeLocation);
        if (isResponseError(response)) {
            return yield put(
                populateTaskServicesFromError(response.message, taskId, AsyncGenericErrorType.BadServerResponse)
            );
        }
        const validator = servicesAtLocationValidator(response.results);
        if (isValidationError(validator)) {
            return yield put(
                populateTaskServicesFromError(validator.errors, taskId, AsyncGenericErrorType.ValidationFailure)
            );
        }
        yield put(
            populateTaskServicesFromSuccess(taskId, R.map(serviceFromValidatedJSON, response.results))
        );
    } catch (error) {
        yield put(
            populateTaskServicesFromError(error.message, taskId, AsyncGenericErrorType.Exception)
        );
    }
}

type SuccessOrFailureResult = PopulateTaskServicesFromSuccessAction | PopulateTaskServicesFromErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;

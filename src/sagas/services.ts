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
import { isResponseError } from '../api/is_response_error';
import { servicesAtLocationValidator, isValidationError } from '../json_schemas/validators';
import { isAsyncLocationError, getLocationIfPermittedAsync } from '../async/location';
import { AsyncGenericErrorType, AsyncLocationErrorType } from '../async/error_types';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

export type ServicesErrorType = AsyncGenericErrorType | AsyncLocationErrorType;

export function* updateTaskServices(action: SendTopicServicesRequestAction): UpdateResult {
    const topicId = action.payload.topicId;
    try {
        const maybeLocation = yield call(getLocationIfPermittedAsync);
        if (isAsyncLocationError(maybeLocation)) {
            return yield put(
                populateTopicServicesFromError(maybeLocation.message, topicId, maybeLocation.type),
            );
        }
        const response: APIResponse = yield call(searchServices, topicId, maybeLocation);
        if (isResponseError(response)) {
            return yield put(
                populateTopicServicesFromError(response.message, topicId, AsyncGenericErrorType.BadServerResponse),
            );
        }
        const validator = servicesAtLocationValidator(response.results);
        if (isValidationError(validator)) {
            return yield put(
                populateTopicServicesFromError(validator.errors, topicId, AsyncGenericErrorType.ValidationFailure),
            );
        }
        yield put(
            populateTopicServicesFromSuccess(topicId, R.map(serviceFromValidatedJSON, response.results)),
        );
    } catch (error) {
        yield put(
            populateTopicServicesFromError(error.message, topicId, AsyncGenericErrorType.Exception),
        );
    }
}

type SuccessOrFailureResult = PopulateTopicServicesFromSuccessAction | PopulateTopicServicesFromErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;

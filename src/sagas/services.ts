// tslint:disable:no-expression-statement
import * as R from 'ramda';
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import {
    SendTaskServicesRequestAction, PopulateTaskServicesFromSuccessAction,
    populateTaskServicesFromSuccess, PopulateTaskServicesFromErrorAction, populateTaskServicesFromError,
    ErrorMessageType, serviceFromValidatedJSON,
} from '../stores/services';
import { API } from '../api';
import { APIResponse } from '../api/api_client';
import { servicesAtLocationValidator } from '../json_schemas/validators';
import { Location, Permissions } from 'expo';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

type SuccessOrFailureResult = PopulateTaskServicesFromSuccessAction | PopulateTaskServicesFromErrorAction;

type UpdateResult = IterableIterator<CallEffect | PutEffect<SuccessOrFailureResult>>;

export function* updateTaskServices(action: SendTaskServicesRequestAction): UpdateResult {
    const taskId = action.payload.taskId;
    try {
        const maybeLocation = yield call(getLocationIfPermittedAsync);
        const response: APIResponse = yield call([API, API.searchServices], taskId, maybeLocation);
        const validator = servicesAtLocationValidator(response.results);
        const hasNoLocation = !maybeLocation;
        const hasResponseErrors = response.hasError;
        const hasValidationErrors = !validator.isValid;

        if (hasNoLocation) {
            yield put(populateTaskServicesFromError('Location error', taskId, ErrorMessageType.Location));
        } else if (hasResponseErrors) {
            yield put(populateTaskServicesFromError(response.message, taskId, ErrorMessageType.Server));
        } else if (hasValidationErrors) {
            yield put(populateTaskServicesFromError(validator.errors, taskId, ErrorMessageType.Server));
        } else {
            const res = populateTaskServicesFromSuccess(taskId, R.map(serviceFromValidatedJSON, response.results));
            yield put(res);
        }
    } catch (error) {
        yield put(populateTaskServicesFromError(error.message, taskId, ErrorMessageType.Exception));
    }
}

const getLocationIfPermittedAsync = async (): Promise<LocationData | undefined> => {
    try {
        const permissions = await Permissions.askAsync(Permissions.LOCATION);
        if (permissions.status !== 'granted') {
            return undefined;
        }
        return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low, timeout: 1000 });
    } catch (error) {
        return undefined;
    }
};

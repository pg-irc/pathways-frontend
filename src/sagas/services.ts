// tslint:disable:no-expression-statement
import * as R from 'ramda';
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { UpdateTaskServicesAsync, serviceFromValidatedJSON } from '../stores/services';
import { API } from '../api';
import { APIResponse } from '../api';
import { servicesAtLocationValidator } from '../json_schemas/validators';
import { Location, Permissions } from 'expo';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

type UpdateResult = IterableIterator<CallEffect | PutEffect<UpdateTaskServicesAsync.Result>>;

export function* updateTaskServices(action: UpdateTaskServicesAsync.Request): UpdateResult {
    const taskId = action.payload.taskId;
    try {
        const maybeLocation = yield call(getLocationIfPermittedAsync);
        const response: APIResponse = yield call(API.findRelatedServices, taskId, maybeLocation);
        const validator = servicesAtLocationValidator(response.results);

        if (response.hasError) {
            yield put(UpdateTaskServicesAsync.failure(response.message, taskId));
        } else if (!validator.isValid) {
            yield put(UpdateTaskServicesAsync.failure(validator.errors, taskId));
        } else {
            yield put(UpdateTaskServicesAsync.success(taskId, R.map(serviceFromValidatedJSON, response.results)));
        }
    } catch (error) {
        yield put(UpdateTaskServicesAsync.failure(error.message, taskId));
    }
}

const getLocationIfPermittedAsync = async (): Promise<Location.LocationData | undefined> => {
    try {
        const permissions = await Permissions.askAsync(Permissions.LOCATION);
        if (permissions.status !== 'granted') {
            return undefined;
        }
        return await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
    } catch (error) {
        return undefined;
    }
};

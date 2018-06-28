// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import { Task as constants } from '../application/constants';
import { UpdateTaskServicesAsync, updateTaskServicesAsync, serviceFromServiceData } from '../stores/services';
import { API } from '../api';
import { APIResponse } from '../api/api_client';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.UPDATE_SERVICES_REQUEST, updateTaskServices);
}

export function* updateTaskServices(
    action: UpdateTaskServicesAsync.Request,
): IterableIterator<CallEffect | PutEffect<UpdateTaskServicesAsync.Result>> {
    const query = action.payload.query;
    const taskId = action.payload.taskId;
    const response: APIResponse = yield call([API, API.searchServices], query);
    if (response.hasError) {
        yield put(updateTaskServicesAsync.failure(response.message, taskId));
    } else {
        const services = response.results.map(serviceFromServiceData);
        yield put(updateTaskServicesAsync.success(taskId, services));
    }
}
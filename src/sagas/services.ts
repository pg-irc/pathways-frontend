// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import { Task as constants } from '../application/constants';
import { UpdateTaskServicesAsync, updateTaskServicesAsync, serviceFromServiceData } from '../stores/services';
import { API, APIError } from '../api';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.UPDATE_SERVICES_REQUEST, updateTaskServices);
}

export function* updateTaskServices(
    action: UpdateTaskServicesAsync.Request,
): IterableIterator<CallEffect | PutEffect<UpdateTaskServicesAsync.Result>> {
    const query = action.payload.query;
    const task = action.payload.task;
    try {
        const servicesData = yield call(API.searchServices, query);
        const services = servicesData.map(serviceFromServiceData);
        yield put(updateTaskServicesAsync.success(task, services));
    } catch (e) {
        if (e instanceof APIError) {
            yield put(updateTaskServicesAsync.failure(e.message, task));
        }
        throw e;
    }
}
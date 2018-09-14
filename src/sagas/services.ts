// tslint:disable:no-expression-statement
import * as R from 'ramda';
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { UpdateTaskServicesAsync, updateTaskServicesAsync, serviceFromJSONSchema } from '../stores/services';
import { API } from '../api';
import { APIResponse } from '../api/api_client';
import { isValidServiceAtLocationSchema } from '../json_schemas/validate';
import { Service } from '../stores/services';

export function* watchUpdateTaskServices(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_SERVICES_REQUEST, updateTaskServices);
}

type UpdateResult = IterableIterator<CallEffect | PutEffect<UpdateTaskServicesAsync.Result>>;
export function* updateTaskServices(action: UpdateTaskServicesAsync.Request): UpdateResult {
    const query = action.payload.query;
    const taskId = action.payload.taskId;
    const response: APIResponse = yield call([API, API.searchServices], query);
    if (response.hasError) {
        yield put(updateTaskServicesAsync.failure(response.message, taskId));
    } else {
        const buildValidServices = R.compose(R.map(serviceFromJSONSchema), R.filter(isValidServiceAtLocationSchema)());
        // Monitor this issue: https://github.com/types/npm-ramda/issues/394 experienced in R.filter above.
        // The () after R.filter(isValidServiceAtLocation) is in place so Typescript picks a more generic type,
        // unforunately doing this creates the requirement to coerce the type below.
        const services = buildValidServices(response.results) as ReadonlyArray<Service>;
        yield put(updateTaskServicesAsync.success(taskId, services));
    }
}
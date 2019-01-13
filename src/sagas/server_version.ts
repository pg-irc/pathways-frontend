// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, ForkEffect, takeLatest, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { API } from '../api';
import { APIResponse } from '../api';
import { GetServerVersionAsync } from '../stores/server_version';

export function* watchGetServerVersion(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.GET_SERVER_VERSION_REQUEST, getServerVersion);
}

type UpdateResult = IterableIterator<CallEffect | PutEffect<GetServerVersionAsync.ResultAction>>;

export function* getServerVersion(): UpdateResult {
    try {
        const response: APIResponse = yield call(API.getServerVersion);

        if (response.hasError) {
            yield put(GetServerVersionAsync.failure(response.message));
        } else {
            yield put(GetServerVersionAsync.success(response.results));
        }
    } catch (error) {
        yield put(GetServerVersionAsync.failure(error.message));
    }
}

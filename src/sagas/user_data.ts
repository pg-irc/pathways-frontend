// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put, ForkEffect, takeLatest, select, SelectEffect } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { USER_DATA_STORAGE_KEY } from '../application/constants';
import { UserData } from '../stores/user_data';
import { PersistedUserData } from '../selectors/user_data/persisted_user_data';
import * as constants from '../application/constants';
import { selectUserDataForLocalPersistence } from '../selectors/user_data/select_user_data_for_local_persistence';

export function* watchAnswerChangesToSaveUserData(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.CHOOSE_ANSWER, saveUserData);
}

type SaveActions = IterableIterator<SelectEffect | CallEffect | PutEffect<UserData.SaveSuccessAction | UserData.SaveFailureAction>>;

export function* saveUserData(): SaveActions {
    try {
        const userData: PersistedUserData = yield select(selectUserDataForLocalPersistence);
        const serializedUserData = serialize(userData);
        yield call(saveUserDataAsync, serializedUserData);
        yield put(UserData.saveSuccess());
    } catch (error) {
        console.error(`Failed to save user data (${error.message})`);
        yield put(UserData.saveFailure(error.message));
    }
}

export async function saveUserDataAsync(ids: string): Promise<void> {
    return await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, ids);
}

const serialize = (userData: PersistedUserData): string => (
    JSON.stringify(userData)
);

export function* watchLoadUserData(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_USER_DATA_REQUEST, loadUserData);
}

type LoadActions = IterableIterator<CallEffect | PutEffect<UserData.LoadSuccessAction | UserData.LoadFailureAction>>;

export function* loadUserData(): LoadActions {
    try {
        const serializedUserData = yield call(loadUserDataAsync);
        const userData = deserialize(serializedUserData);
        yield put(UserData.loadSuccess(userData));
    } catch (error) {
        console.error(`Failed to load user data (${error.message})`);
        yield put(UserData.loadFailure(error.message));
    }
}

export async function loadUserDataAsync(): Promise<string> {
    return await AsyncStorage.getItem(USER_DATA_STORAGE_KEY);
}

const deserialize = (serializedUserData: string): PersistedUserData => (
    serializedUserData ? JSON.parse(serializedUserData) : { chosenAnswers: [], savedTasks: [] }
);

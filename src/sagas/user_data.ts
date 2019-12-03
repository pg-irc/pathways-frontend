// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put, ForkEffect, takeLatest, select, SelectEffect } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { USER_DATA_STORAGE_KEY } from '../application/constants';
import { UserDataPersistence } from '../stores/user_data';
import { PersistedUserData } from '../stores/user_data';
import * as constants from '../application/constants';
import { selectUserDataForLocalPersistence } from '../selectors/user_data/select_user_data_for_local_persistence';

export function* watchUserStateChangesToSaveUserData(): IterableIterator<ForkEffect> {
    yield takeLatest(
        [
            constants.CHOOSE_ANSWER,
            constants.ADD_BOOKMARK,
            constants.REMOVE_BOOKMARK,
            constants.CLEAR_ALL_USER_DATA,
            constants.SET_ONBOARDING,
        ],
        saveUserData);
}

type SaveActions = IterableIterator<
    SelectEffect |
    CallEffect |
    PutEffect<UserDataPersistence.SaveSuccessAction | UserDataPersistence.SaveFailureAction>
>;

export function* saveUserData(): SaveActions {
    try {
        const userData: PersistedUserData = yield select(selectUserDataForLocalPersistence);
        const serializedUserData = serializeUserData(userData);
        yield call(saveUserDataAsync, serializedUserData);
        yield put(UserDataPersistence.saveSuccess());
    } catch (error) {
        console.error(`Failed to save user data (${error.message})`);
        yield put(UserDataPersistence.saveFailure(error.message));
    }
}

export async function saveUserDataAsync(ids: string): Promise<void> {
    return await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, ids);
}

export const serializeUserData = (userData: PersistedUserData): string => (
    JSON.stringify(userData)
);

export function* watchLoadUserData(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_USER_DATA_REQUEST, loadUserData);
}

type LoadActions = IterableIterator<CallEffect | PutEffect<UserDataPersistence.LoadSuccessAction | UserDataPersistence.LoadFailureAction>>;

export function* loadUserData(): LoadActions {
    try {
        const serializedUserData = yield call(loadUserDataAsync);
        const userData = deserializeUserData(serializedUserData);
        yield put(UserDataPersistence.loadSuccess(userData));
    } catch (error) {
        console.error(`Failed to load user data (${error.message})`);
        yield put(UserDataPersistence.loadFailure(error.message));
    }
}

export async function loadUserDataAsync(): Promise<string> {
    return await AsyncStorage.getItem(USER_DATA_STORAGE_KEY);
}

export const deserializeUserData = (serializedUserData: string): PersistedUserData => (
    serializedUserData ? setUserDataDefaultValues(JSON.parse(serializedUserData)) : setUserDataDefaultValues({})
);

export const setUserDataDefaultValues = (data: any): PersistedUserData => (
    {
        chosenAnswers: data.chosenAnswers || [],
        savedTopics: data.savedTopics || [],
        showOnboarding: typeof data.showOnboarding === 'undefined' ? true : data.showOnboarding,
    }
);

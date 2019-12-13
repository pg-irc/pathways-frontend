// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put, ForkEffect, takeLatest, select, SelectEffect } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { USER_DATA_STORAGE_KEY } from '../application/constants';
import { DataPersistence } from '../stores/persisted_data';
import { PersistedData } from '../stores/persisted_data';
import * as constants from '../application/constants';
import { selectUserDataForLocalPersistence } from '../selectors/user_data/select_user_data_for_local_persistence';
import { validateUserData } from '../validation/user_data';

export function* watchUserStateChangesToSaveUserData(): IterableIterator<ForkEffect> {
    yield takeLatest(
        [
            constants.CHOOSE_ANSWER,
            constants.BOOKMARK_TOPIC,
            constants.UNBOOKMARK_TOPIC,
            constants.TOGGLE_IS_TOPIC_COMPLETED,
            constants.CLEAR_ALL_USER_DATA,
            constants.SET_ONBOARDING,
            constants.BOOKMARK_SERVICE,
            constants.UNBOOKMARK_SERVICE,
        ],
        saveUserData);
}

type SaveActions = IterableIterator<
    SelectEffect |
    CallEffect |
    PutEffect<DataPersistence.SaveSuccessAction | DataPersistence.SaveFailureAction>
>;

export function* saveUserData(): SaveActions {
    try {
        const userData: PersistedData = yield select(selectUserDataForLocalPersistence);
        const serializedUserData = serializeUserData(userData);
        yield call(saveUserDataAsync, serializedUserData);
        yield put(DataPersistence.saveSuccess());
    } catch (error) {
        console.error(`Failed to save user data (${error.message})`);
        yield put(DataPersistence.saveFailure(error.message));
    }
}

export async function saveUserDataAsync(ids: string): Promise<void> {
    return await AsyncStorage.setItem(USER_DATA_STORAGE_KEY, ids);
}

export const serializeUserData = (userData: PersistedData): string => (
    JSON.stringify(userData)
);

export function* watchLoadUserData(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_USER_DATA_REQUEST, loadUserData);
}

type LoadActions = IterableIterator<CallEffect | PutEffect<DataPersistence.LoadSuccessAction | DataPersistence.LoadFailureAction>>;

export function* loadUserData(): LoadActions {
    try {
        const serializedUserData = yield call(loadUserDataAsync);
        const userData = deserializeUserData(serializedUserData);
        const validatedUserData = validateUserData(userData);
        if (!validatedUserData.isValid) {
            console.log(validatedUserData);
            yield put(DataPersistence.loadFailure('Failed to load user data'));
        }
        yield put(DataPersistence.loadSuccess(userData));
    } catch (error) {
        console.error(`Failed to load user data (${error.message})`);
        yield put(DataPersistence.loadFailure(error.message));
    }
}

export async function loadUserDataAsync(): Promise<string> {
    return await AsyncStorage.getItem(USER_DATA_STORAGE_KEY);
}

export const deserializeUserData = (serializedUserData: string): PersistedData => (
    serializedUserData ? setUserDataDefaultValues(JSON.parse(serializedUserData)) : setUserDataDefaultValues({})
);

export const setUserDataDefaultValues = (data: any): PersistedData => (
    {
        chosenAnswers: data.chosenAnswers || [],
        bookmarkedTopics: data.bookmarkedTopics || [],
        showOnboarding: typeof data.showOnboarding === 'undefined' ? true : data.showOnboarding,
        bookmarkedServices: data.bookmarkedServices || {},
        disableAnalytics: typeof data.disableAnalytics === 'undefined' ? false : data.disableAnalytics,
    }
);

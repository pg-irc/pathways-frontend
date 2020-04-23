// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put, ForkEffect, takeLatest, select, SelectEffect } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { USER_DATA_STORAGE_KEY } from '../application/constants';
import { DataPersistence, PersistedData } from '../stores/persisted_data';
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
            constants.HIDE_ONBOARDING,
            constants.BOOKMARK_SERVICE,
            constants.UNBOOKMARK_SERVICE,
            constants.SAVE_SEARCH_TERM,
            constants.SAVE_SEARCH_LOCATION,
            constants.SAVE_SEARCH_PAGE,
            constants.SAVE_NUMBER_OF_SEARCH_PAGES,
            constants.SAVE_SEARCH_OFFSET,
            constants.SAVE_SEARCH_RESULTS,
            constants.SET_COLLAPSE_SEARCH_INPUT,
            constants.HIDE_PARTIAL_LOCALIZATION_MESSAGE,
            constants.DISABLE_ANALYTICS,
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
        searchTerm: data.searchTerm || '',
        searchPage: typeof data.searchPage === 'undefined' ? 0 : data.searchPage,
        numberOfSearchPages: typeof data.numberOfSearchPages === 'undefined' ? 0 : data.numberOfSearchPages,
        searchOffset: typeof data.searchOffset === 'undefined' ? 0 : data.searchOffset,
        searchLocation: data.searchLocation || '',
        searchLatLong: data.searchLatLong || undefined,
        searchResults: data.searchResults || [],
        collapseSearchInput: typeof data.collapseSearchInput === 'undefined' ? false : data.collapseSearchInput,
        showPartialLocalizationMessage: typeof data.showPartialLocalizationMessage === 'undefined' ? true : data.showPartialLocalizationMessage,
    }
);

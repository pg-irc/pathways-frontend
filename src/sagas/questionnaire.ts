// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put, ForkEffect, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { ACTIVE_QUESTIONS_STORAGE_KEY } from '../application/constants';
import { Persistence, Id } from '../stores/questionnaire';
import * as constants from '../application/constants';

export function* watchSaveActiveQuestions(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SAVE_ACTIVE_QUESTIONS_REQUEST, saveActiveQuestions);
}

type SaveActions = IterableIterator<CallEffect | PutEffect<Persistence.SaveSuccessAction | Persistence.SaveFailureAction>>;

export function* saveActiveQuestions(request: Persistence.SaveRequestAction): SaveActions {
    try {
        const serializedIds = serialize(request.payload.activeQuestions);
        yield call(saveActiveQuestionsAsync, serializedIds);
        yield put(Persistence.saveSuccess());
    } catch (error) {
        console.error(`Failed to save active questions (${error.message})`);
        yield put(Persistence.saveFailure(error.message));
    }
}

export async function saveActiveQuestionsAsync(ids: string): Promise<void> {
    return await AsyncStorage.setItem(ACTIVE_QUESTIONS_STORAGE_KEY, ids);
}

const serialize = (ids: ReadonlyArray<string>): string => (
    ids.join(',')
);

export function* watchLoadActiveQuestions(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_ACTIVE_QUESTIONS_REQUEST, loadActiveQuestions);
}

type LoadActions = IterableIterator<CallEffect | PutEffect<Persistence.LoadSuccessAction | Persistence.LoadFailureAction>>;

export function* loadActiveQuestions(): LoadActions {
    try {
        const serializedIds = yield call(loadActiveQuestionsAsync);
        const ids = deserialize(serializedIds);
        yield put(Persistence.loadSuccess(ids));
    } catch (error) {
        console.error(`Failed to load active questions (${error.message})`);
        yield put(Persistence.loadFailure(error.message));
    }
}

export async function loadActiveQuestionsAsync(): Promise<string> {
    return await AsyncStorage.getItem(ACTIVE_QUESTIONS_STORAGE_KEY);
}

const deserialize = (ids: string): ReadonlyArray<Id> => (
    ids.split(',')
);

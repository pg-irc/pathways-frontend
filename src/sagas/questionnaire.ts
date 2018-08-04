// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { QUESTIONNAIRE_LOCAL_STORAGE_KEY } from '../application/constants';
import { Persistence, Id } from '../stores/questionnaire';

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
    return await AsyncStorage.setItem(QUESTIONNAIRE_LOCAL_STORAGE_KEY, ids);
}

const serialize = (ids: ReadonlyArray<string>): string => (
    ids.join(',')
);

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
    return await AsyncStorage.getItem(QUESTIONNAIRE_LOCAL_STORAGE_KEY);
}

const deserialize = (ids: string): ReadonlyArray<Id> => (
    ids.split(',')
);

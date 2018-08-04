// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { QUESTIONNAIRE_LOCAL_STORAGE_KEY } from '../application/constants';
import { Persistence, Id } from '../stores/questionnaire';

export namespace Async {

    export async function saveActiveQuestionsToStorage(ids: string): Promise<void> {
        return await AsyncStorage.setItem(QUESTIONNAIRE_LOCAL_STORAGE_KEY, ids);
    }

    export async function loadActiveQuestionsFromStorage(): Promise<string> {
        return await AsyncStorage.getItem(QUESTIONNAIRE_LOCAL_STORAGE_KEY);
    }
}

type SaveActions = IterableIterator<CallEffect | PutEffect<Persistence.SaveSuccess>>;

export function* saveActiveQuestions(request: Persistence.SaveRequest): SaveActions {
    const serializedIds = serialize(request.payload.activeQuestions);
    yield call(Async.saveActiveQuestionsToStorage, serializedIds);
    yield put(Persistence.saveSuccess());
}

type LoadActions = IterableIterator<CallEffect | PutEffect<Persistence.LoadSuccess | Persistence.LoadFailure>>;

export function* loadActiveQuestions(): LoadActions {
    try {
        const serializedIds = yield call(Async.loadActiveQuestionsFromStorage);
        const ids = deserialize(serializedIds);
        yield put(Persistence.loadSuccess(ids));
    } catch (error) {
        console.error(`Failed to load active questions (${error.message})`);
        yield put(Persistence.loadFailure(error.message));
    }
}

const serialize = (ids: ReadonlyArray<string>): string => (
    ids.join(',')
);

const deserialize = (ids: string): ReadonlyArray<Id> => (
    ids.split(',')
);

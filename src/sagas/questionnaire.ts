// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put, ForkEffect, takeLatest, select, SelectEffect } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { CHOSEN_QUESTIONS_STORAGE_KEY } from '../application/constants';
import { LocalStorage, Id } from '../stores/questionnaire';
import * as constants from '../application/constants';
import { selectIdsOfChosenAnswers } from '../selectors/questionnaire/select_ids_of_chosen_questions';

export function* watchAnswerChangesToSaveAllAnswerStates(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.CHOOSE_ANSWER, saveChosenQuestions);
}

type SaveActions = IterableIterator<SelectEffect | CallEffect | PutEffect<LocalStorage.SaveSuccessAction | LocalStorage.SaveFailureAction>>;

export function* saveChosenQuestions(): SaveActions {
    try {
        const ids = yield select(selectIdsOfChosenAnswers);
        const serializedIds = serialize(ids);
        yield call(saveChosenQuestionsAsync, serializedIds);
        yield put(LocalStorage.saveSuccess());
    } catch (error) {
        console.error(`Failed to save chosen answers (${error.message})`);
        yield put(LocalStorage.saveFailure(error.message));
    }
}

export async function saveChosenQuestionsAsync(ids: string): Promise<void> {
    return await AsyncStorage.setItem(CHOSEN_QUESTIONS_STORAGE_KEY, ids);
}

const serialize = (ids: ReadonlyArray<string>): string => (
    ids.join(',')
);

export function* watchLoadChosenQuestions(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CHOSEN_QUESTIONS_REQUEST, loadChosenQuestions);
}

type LoadActions = IterableIterator<CallEffect | PutEffect<LocalStorage.LoadSuccessAction | LocalStorage.LoadFailureAction>>;

export function* loadChosenQuestions(): LoadActions {
    try {
        const serializedIds = yield call(loadChosenQuestionsAsync);
        const ids = deserialize(serializedIds);
        yield put(LocalStorage.loadSuccess(ids));
    } catch (error) {
        console.error(`Failed to load chosen answers (${error.message})`);
        yield put(LocalStorage.loadFailure(error.message));
    }
}

export async function loadChosenQuestionsAsync(): Promise<string> {
    return await AsyncStorage.getItem(CHOSEN_QUESTIONS_STORAGE_KEY);
}

const deserialize = (ids: string): ReadonlyArray<Id> => (
    ids ? ids.split(',') : []
);

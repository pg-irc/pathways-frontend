// tslint:disable:no-expression-statement

import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { QUESTIONNAIRE_LOCAL_STORAGE_KEY } from '../application/constants';
import { Persistence, Id } from '../stores/questionnaire';

export namespace Effects {
    export async function loadActiveQuestionsFromAsyncStorage(): Promise<string> {
        return await AsyncStorage.getItem(QUESTIONNAIRE_LOCAL_STORAGE_KEY);
    }
}

export function* loadActiveQuestions(): IterableIterator<CallEffect | PutEffect<Persistence.Success | Persistence.Failure>> {
    try {
        const questionIds = yield call(Effects.loadActiveQuestionsFromAsyncStorage);
        const parsedQuestionIds = parse(questionIds);
        yield put(Persistence.success(parsedQuestionIds));
    } catch (error) {
        console.error(`Failed to load active questions (${error.message})`);
        yield put(Persistence.failure(error.message));
    }
}

const parse = (commaSeparatedIds: string): ReadonlyArray<Id> => {
    return commaSeparatedIds.split(',');
};

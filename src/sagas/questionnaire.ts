import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { QUESTIONNAIRE_LOCAL_STORAGE_KEY } from '../application/constants';
import { Persistence, Id } from '../stores/questionnaire';

export namespace Effects {
    export async function loadActiveQuestionsFromAsyncStorage(): Promise<string> {
        return await AsyncStorage.getItem(QUESTIONNAIRE_LOCAL_STORAGE_KEY);
    }
}

export function* loadActiveQuestions(): IterableIterator<CallEffect | PutEffect<Persistence.Success>> {
    const activeQuestions = yield call(Effects.loadActiveQuestionsFromAsyncStorage);
    // tslint:disable-next-line:no-expression-statement
    yield put(Persistence.success(parse(activeQuestions)));
}

const parse = (commaSeparatedIds: string): ReadonlyArray<Id> => {
    return commaSeparatedIds.split(',');
};

// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects';

import * as constants from '../application/constants';
import { LocaleInfoManager, saveCurrentLocaleCode, loadCurrentLocaleCode, reload } from '../locale';
import { LoadCurrentLocaleRequestAction,loadCurrentLocaleSuccess, loadCurrentLocaleFailure, LoadCurrentLocaleResult, SetLocaleRequestAction, SetLocaleResult, setLocaleSuccess, setLocaleFailure, } from '../stores/locale';
import { setTextDirection, needsTextDirectionChange } from '../locale/effects';

export function* watchSetLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SET_LOCALE_REQUEST, applyLocaleChange);
}

export function* applyLocaleChange(action: SetLocaleRequestAction): IterableIterator<CallEffect | PutEffect<SetLocaleResult>> {
    const localeCode = action.payload.localeCode;
    try {
        const message = '';
        const loading = false; 
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(setLocaleSuccess(message, loading, localeCode));
        if (yield call(needsTextDirectionChange, localeCode)) {
            yield call(setTextDirection, localeCode);
            yield call(reload);
        }
    } catch (e) {
        const loading = false;
        yield put(setLocaleFailure(e.message, loading, localeCode));
    }
}

export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export type LoadCurrentLocaleActions = LoadCurrentLocaleRequestAction | LoadCurrentLocaleResult;

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<LoadCurrentLocaleActions>> {
    try {
        const retrievedCode = yield call(loadCurrentLocaleCode);

        if (retrievedCode === null) {
            const fallbackLocale = LocaleInfoManager.getFallback();
            yield call(saveCurrentLocaleCode, fallbackLocale.code);
            const isSet = false;
            const loading = false; 
            const message = '';
            yield put(loadCurrentLocaleSuccess(message, loading, fallbackLocale.code, isSet));
        } else {
            const locale = LocaleInfoManager.get(retrievedCode);
            const isSet = true;
            const loading = false; 
            const message = '';
            yield put(loadCurrentLocaleSuccess(message, loading, locale.code, isSet));
        }
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        const loading = false; 
        yield put(loadCurrentLocaleFailure(e.message, loading));
    }
}
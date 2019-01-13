// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects';

import * as constants from '../application/constants';
import { LocaleInfoManager, saveCurrentLocaleCode, loadCurrentLocaleCode, reload } from '../locale';
import { SaveCurrentLocaleAsync, LoadCurrentLocaleAsync } from '../stores/locale';
import { toggleTextDirection, needsTextDirectionChange } from '../locale/effects';

export function* watchSetLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SET_LOCALE_REQUEST, applyLocaleChange);
}

export function* applyLocaleChange(action: SaveCurrentLocaleAsync.Request): IterableIterator<CallEffect | PutEffect<SaveCurrentLocaleAsync.Result>> {
    const localeCode = action.payload.localeCode;
    try {
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(SaveCurrentLocaleAsync.success(localeCode));
        if (yield call(needsTextDirectionChange, localeCode)) {
            yield call(toggleTextDirection);
            yield call(reload);
        }
    } catch (e) {
        yield put(SaveCurrentLocaleAsync.failure(e.message, localeCode));
    }
}

export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export type LoadCurrentLocaleActions = LoadCurrentLocaleAsync.Request | LoadCurrentLocaleAsync.Result;

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<LoadCurrentLocaleActions>> {
    try {
        const code = yield call(loadCurrentLocaleCode);
        const locale = code !== null ? LocaleInfoManager.get(code) : LocaleInfoManager.getFallback();
        yield put(LoadCurrentLocaleAsync.success(locale.code));
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(LoadCurrentLocaleAsync.failure(e.message));
    }
}
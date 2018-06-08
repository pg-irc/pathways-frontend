// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect} from 'redux-saga/effects';

import * as constants from '../application/constants';
import { LocaleInfoManager, saveCurrentLocaleCode, loadCurrentLocaleCode, reload } from '../locale';
import { SetLocale, LoadCurrentLocale, setLocaleActions, loadCurrentLocaleActions } from '../stores/locale';
import { toggleTextDirection, needsTextDirectionChange } from '../locale/effects';

export function* watchSetLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SET_LOCALE_REQUEST, applyLocaleChange);
}

export function* applyLocaleChange(action: SetLocale.Request): IterableIterator<CallEffect | PutEffect<SetLocale.Result>> {
    const localeCode = action.payload.localeCode;
    try {
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(setLocaleActions.success(localeCode));
        if (yield call(needsTextDirectionChange, localeCode)) {
            yield call(toggleTextDirection);
            yield call(reload);
        }
    } catch (e) {
        yield put(setLocaleActions.failure(e.message, localeCode));
    }
}

export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export type LoadCurrentLocaleActions = LoadCurrentLocale.Request | LoadCurrentLocale.Result | SetLocale.Success;

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<LoadCurrentLocaleActions>> {
    try {
        const code = yield call(loadCurrentLocaleCode);
        const locale = code !== null ? LocaleInfoManager.get(code) : LocaleInfoManager.getFallback();
        yield put(loadCurrentLocaleActions.success(locale.code));
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(loadCurrentLocaleActions.failure(e.message));
    }
}
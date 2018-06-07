// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect} from 'redux-saga/effects';

import * as constants from '../application/constants';
import { saveCurrentLocaleCode, loadCurrentLocaleCode, isReloadNeeded, reloadRTL, LocaleManager } from '../application/locale';
import { SetLocale, LoadCurrentLocale, setLocaleActions, loadCurrentLocaleActions } from '../stores/locale';

export function* watchSetLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SET_LOCALE_REQUEST, applyLocaleChange);
}

export function* applyLocaleChange(action: SetLocale.Request): IterableIterator<CallEffect | PutEffect<SetLocale.Result>> {
    const locale = action.payload.locale;
    try {
        yield call(saveCurrentLocaleCode, locale.code);
        yield put(setLocaleActions.success(locale));
        if (yield call(isReloadNeeded, locale)) {
            yield call(reloadRTL, locale.isRTL);
        }
    } catch (e) {
        yield put(setLocaleActions.failure(e.message, locale));
    }
}

export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export type LoadCurrentLocaleActions = LoadCurrentLocale.Request | LoadCurrentLocale.Result | SetLocale.Success;

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<LoadCurrentLocaleActions>> {
    try {
        const code = yield call(loadCurrentLocaleCode);
        const locale = code !== null ? LocaleManager.get(code) : LocaleManager.getFallbackLocale();
        yield put(loadCurrentLocaleActions.success(locale));
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(loadCurrentLocaleActions.failure(e.message));
    }
}
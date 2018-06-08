// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect} from 'redux-saga/effects';

import * as constants from '../application/constants';
import { saveCurrentLocaleCode, loadCurrentLocaleCode, isReloadNeeded, reloadRTL, LocaleDefinitionManager } from '../locale';
import { SetLocale, LoadCurrentLocale, setLocaleActions, loadCurrentLocaleActions } from '../stores/locale';

export function* watchSetLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SET_LOCALE_REQUEST, applyLocaleChange);
}

export function* applyLocaleChange(action: SetLocale.Request): IterableIterator<CallEffect | PutEffect<SetLocale.Result>> {
    const localeCode = action.payload.localeCode;
    try {
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(setLocaleActions.success(localeCode));
        const localeDefinition = LocaleDefinitionManager.get(localeCode);
        if (yield call(isReloadNeeded, localeDefinition)) {
            yield call(reloadRTL, localeDefinition.isRTL);
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
        const locale = code !== null ? LocaleDefinitionManager.get(code) : LocaleDefinitionManager.getFallback();
        yield put(loadCurrentLocaleActions.success(locale.code));
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(loadCurrentLocaleActions.failure(e.message));
    }
}
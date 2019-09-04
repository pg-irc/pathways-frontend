// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { LocaleInfoManager, saveCurrentLocaleCode, loadCurrentLocaleCode } from '../locale';
import * as actions from '../stores/locale/actions';
import { setTextDirection, isRTL } from '../locale/effects';
import { I18nManager } from 'react-native';

export function* watchSaveLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SAVE_LOCALE_REQUEST, applyLocaleChange);
}

export function* watchSaveLocaleSuccess(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SAVE_LOCALE_SUCCESS, enforceRTLChange);
}

export function* watchLoadLocaleSuccess(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_SUCCESS, enforceRTLChange);
}

export function* enforceRTLChange(action: actions.SaveLocaleSuccessAction | actions.LoadLocaleSuccessAction): Iterator<CallEffect> {
    console.log('inside enforceRTLChange');
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    if (flipOrientation) {
        console.log('actually flipping locales');
        yield call(setTextDirection, localeCode);
    }
}

export function* applyLocaleChange(action: actions.SaveLocaleRequestAction): IterableIterator<CallEffect | PutEffect<actions.SaveLocaleResult>> {
    console.log('inside applyLocaleChange');
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    try {
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(actions.saveLocaleSuccess(localeCode, flipOrientation));
    } catch (e) {
        yield put(actions.saveLocaleFailure(e.message, localeCode));
    }
}

export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export type LoadLocaleActions = actions.LoadLocaleAction;

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<LoadLocaleActions>> {
    console.log('inside loadCurrentLocale');
    try {
        const retrievedCode = yield call(loadCurrentLocaleCode);
        const RTL = I18nManager.isRTL;

        if (retrievedCode === null) {
            const fallbackLocale = LocaleInfoManager.getFallback();
            yield call(saveCurrentLocaleCode, fallbackLocale.code);
            const isSaved = false;
            const flipOrientation = RTL !== isRTL(fallbackLocale.code);
            yield put(actions.loadLocaleSuccess(fallbackLocale.code, isSaved, flipOrientation));
        } else {
            const locale = LocaleInfoManager.get(retrievedCode);
            const isSaved = true;
            const flipOrientation = RTL !== isRTL(locale.code);
            yield put(actions.loadLocaleSuccess(locale.code, isSaved, flipOrientation));
        }
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(actions.loadLocaleFailure(e.message));
    }
}
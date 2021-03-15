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

export function* applyLocaleChange(action: actions.SaveLocaleRequestAction): IterableIterator<CallEffect | PutEffect<actions.SaveLocaleResult>> {
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    try {
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(actions.saveLocaleSuccess(localeCode, flipOrientation));
    } catch (e) {
        yield put(actions.saveLocaleFailure(e.message, localeCode));
    }
}

export function* watchLocaleSuccess(): IterableIterator<ForkEffect> {
    yield takeLatest([constants.SAVE_LOCALE_SUCCESS, constants.LOAD_CURRENT_LOCALE_SUCCESS], enforceRTLChange);
}

export function* enforceRTLChange(action: actions.SaveLocaleSuccessAction | actions.LoadLocaleSuccessAction): Iterator<CallEffect> {
    console.log('running enforceRTLChange');
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    if (flipOrientation) {
        console.log('calls setTextDirection to see if the app needs to change the direction of text');
        yield call(setTextDirection, localeCode);
    } else {
        console.log('does not change direction of text');
    }
}
export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<actions.LoadLocaleAction>> {
    try {
        const retrievedCode = yield call(loadCurrentLocaleCode);
        const RTL = I18nManager.isRTL;
        console.log(I18nManager);
        console.log('loadingCurrentLocale', retrievedCode);
        if (retrievedCode === null) {
            console.log('getting fallbackLocale');
            const fallbackLocale = LocaleInfoManager.getFallback();
            yield call(saveCurrentLocaleCode, fallbackLocale.code);
            const isSaved = false;
            const flipOrientation = RTL !== isRTL(fallbackLocale.code);
            yield put(actions.loadLocaleSuccess(fallbackLocale.code, isSaved, flipOrientation));
        } else {
            const locale = LocaleInfoManager.get(retrievedCode);
            const isSaved = true;
            console.log(`flipOrientation: ${RTL !== isRTL(locale.code)} ~ isRTL: ${isRTL(locale.code)} ~ locale.code: ${locale.code}`);
            const flipOrientation = RTL !== isRTL(locale.code);
            console.log(`loadLocaleSuccess locale.code: ${locale.code} isSaved: ${isSaved}, flipOrientation: ${flipOrientation}`);
            yield put(actions.loadLocaleSuccess(locale.code, isSaved, flipOrientation));
        }
    } catch (e) {
        console.log('loadLocaleError');
        console.error(`Failed to load current locale (${e.message})`);
        yield put(actions.loadLocaleFailure(e.message));
    }
}
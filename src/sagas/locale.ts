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

export function* watchRTL(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SAVE_LOCALE_SUCCESS, applyRTLChange);
}

export function* applyRTLChange(action: actions.SaveLocaleSuccessAction): IterableIterator<CallEffect | PutEffect<actions.SaveLocaleSuccessAction>> {
    console.log('inapplyRTL');
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    if (flipOrientation) {
        yield call(setTextDirection, localeCode);
    }
}

export function* applyLocaleChange(action: actions.SaveLocaleRequestAction): IterableIterator<CallEffect | PutEffect<actions.SaveLocaleResult>> {
    console.log('in applyLocaleChange');
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
    console.log('In loadCurrentLocale');
    try {
        const retrievedCode = yield call(loadCurrentLocaleCode);
        console.log(retrievedCode);
        console.log('RTL flag is set to ' + I18nManager.isRTL);

        if (retrievedCode === null) {
            const fallbackLocale = LocaleInfoManager.getFallback();
            yield call(saveCurrentLocaleCode, fallbackLocale.code);
            const isSaved = false;
            I18nManager.forceRTL(isRTL(fallbackLocale.code));
            yield put(actions.loadLocaleSuccess(fallbackLocale.code, isSaved));
        } else {
            const locale = LocaleInfoManager.get(retrievedCode);
            const isSaved = true;
            I18nManager.forceRTL(isRTL(locale.code));
            yield put(actions.loadLocaleSuccess(locale.code, isSaved));
        }
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(actions.loadLocaleFailure(e.message));
    }
}
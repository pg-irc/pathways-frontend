// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { LocaleInfoManager, saveCurrentLocaleCode, loadCurrentLocaleCode } from '../locale';
import * as actions from '../stores/locale/actions';
import { setTextDirection, isRTL, loadIsRTLBoolean, saveIsRTLBoolean } from '../locale/effects';

export function* watchSaveLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.SAVE_LOCALE_REQUEST, applyLocaleChange);
}

export function* applyLocaleChange(action: actions.SaveLocaleRequestAction): IterableIterator<CallEffect | PutEffect<actions.SaveLocaleResult>> {
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    const isCurrentlyRTL = action.payload.isRTL;
    try {
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(actions.saveLocaleSuccess(localeCode, flipOrientation, isCurrentlyRTL));
    } catch (e) {
        yield put(actions.saveLocaleFailure(e.message, localeCode));
    }
}

export function* watchLocaleSuccess(): IterableIterator<ForkEffect> {
    yield takeLatest([constants.SAVE_LOCALE_SUCCESS], enforceRTLChange);
}

export function* enforceRTLChange(action: actions.SaveLocaleSuccessAction | actions.LoadLocaleSuccessAction): Iterator<CallEffect> {
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    if (flipOrientation) {
        yield call(saveIsRTLBoolean, isRTL(localeCode));
        yield call(setTextDirection, localeCode);
    }
}
export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<actions.LoadLocaleAction>> {
    try {
        const retrievedCode = yield call(loadCurrentLocaleCode);
        const RTL = yield call(loadIsRTLBoolean);
        if (retrievedCode === null) {
            const fallbackLocale = LocaleInfoManager.getFallback();
            yield call(saveCurrentLocaleCode, fallbackLocale.code);
            const isSaved = false;
            const flipOrientation = RTL !== isRTL(fallbackLocale.code);
            yield put(actions.loadLocaleSuccess(fallbackLocale.code, isSaved, flipOrientation, RTL));
        } else {
            const locale = LocaleInfoManager.get(retrievedCode);
            const isSaved = true;
            const flipOrientation = RTL !== isRTL(locale.code);
            yield put(actions.loadLocaleSuccess(locale.code, isSaved, flipOrientation, RTL));
        }
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(actions.loadLocaleFailure(e.message));
    }
}
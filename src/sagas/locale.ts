// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { saveCurrentLocaleCode, loadCurrentLocaleCode } from '../locale/effects';
import * as actions from '../stores/locale/actions';
import { setTextDirection, isRTL } from '../locale/effects';
import { I18nManager } from 'react-native';
import { isAndroid } from '../application/helpers/is_android';
import { Locales } from '../application/locales';

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
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    if (flipOrientation) {
        yield call(setTextDirection, localeCode);
    }
}
export function* watchLoadLocale(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_REQUEST, loadCurrentLocale);
}

export function* loadCurrentLocale(): IterableIterator<CallEffect | PutEffect<actions.LoadLocaleAction>> {
    try {
        const retrievedCode = yield call(loadCurrentLocaleCode);

        if (retrievedCode === null) {
            const fallbackLocale = Locales.getFallback();
            yield call(saveCurrentLocaleCode, fallbackLocale);
            const isSaved = false;
            const RTL = isAppRTL(fallbackLocale);
            const flipOrientation = RTL !== isRTL(fallbackLocale);
            yield put(actions.loadLocaleSuccess(fallbackLocale, isSaved, flipOrientation));
        } else {
            const RTL = isAppRTL(retrievedCode);
            const isSaved = true;
            const flipOrientation = RTL !== isRTL(retrievedCode);
            yield put(actions.loadLocaleSuccess(retrievedCode, isSaved, flipOrientation));
        }
    } catch (e) {
        console.error(`Failed to load current locale (${e.message})`);
        yield put(actions.loadLocaleFailure(e.message));
    }
}

const isAppRTL = (appLocale: string): boolean => {
    if (isAndroid()) {
        return isRTL(appLocale);
    }
    return I18nManager.isRTL;
};

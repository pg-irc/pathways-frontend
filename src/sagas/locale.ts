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
    try {
        yield call(saveCurrentLocaleCode, localeCode);
        yield put(actions.saveLocaleSuccess(localeCode, flipOrientation));
    } catch (e) {
        yield put(actions.saveLocaleFailure(e.message, localeCode));
    }
}

export function* watchLocaleSuccess(): IterableIterator<ForkEffect> {
    yield takeLatest([constants.SAVE_LOCALE_SUCCESS], enforceRTLChange);
}

export function* enforceRTLChange(action: actions.SaveLocaleSuccessAction | actions.LoadLocaleSuccessAction): Iterator<CallEffect> {
    console.log('running enforceRTLChange');
    const localeCode = action.payload.localeCode;
    const flipOrientation = action.payload.flipOrientation;
    if (flipOrientation) {
        console.log('calls setTextDirection to see if the app needs to change the direction of text');
        yield call(saveIsRTLBoolean, isRTL(localeCode));
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
        // const RTL = I18nManager.isRTL;
        const RTL = yield call(loadIsRTLBoolean);

        if (retrievedCode === null) {
            const fallbackLocale = LocaleInfoManager.getFallback();
            yield call(saveCurrentLocaleCode, fallbackLocale.code);
            const isSaved = false;
            const flipOrientation = RTL !== isRTL(fallbackLocale.code);
            yield put(actions.loadLocaleSuccess(fallbackLocale.code, isSaved, flipOrientation));
        }
        if (RTL === null) {
            console.log('RTL is null')
            const locale = LocaleInfoManager.get(retrievedCode);
            const isSaved = true;
            const flipOrientation = isRTL(locale.code);
            console.log(`loadLocaleSuccess locale.code: ${locale.code} isSaved: ${isSaved}, flipOrientation: ${flipOrientation}`);
            yield put(actions.loadLocaleSuccess(locale.code, isSaved, flipOrientation));
        }
        else {
            const locale = LocaleInfoManager.get(retrievedCode);
            const isSaved = true;
            // flipOrientation is false when:
                // device is RTL and 'ar'
                // device is not RTL and not 'ar'

            // flipOrientation is true when:
                // device is RTL and not 'ar'
                // device is LTR and 'ar'
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
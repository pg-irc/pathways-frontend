// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import { Font } from 'expo';

import * as constants from '../application/constants';
import { LoadFontsAsync } from '../stores/fonts';

export function* watchLoadFonts(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_FONTS_REQUEST, loadFonts);
}

export function* loadFonts(action: LoadFontsAsync.Request): IterableIterator<CallEffect | PutEffect<LoadFontsAsync.Result>> {
    try {
        yield call(Font.loadAsync, action.payload.fonts);
        yield put(LoadFontsAsync.success(action.payload.fonts));
    } catch (e) {
        yield put(LoadFontsAsync.failure(e.message, action.payload.fonts));
    }
}
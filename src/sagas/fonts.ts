// tslint:disable:no-expression-statement
import { takeLatest, call, put, ForkEffect, CallEffect, PutEffect} from 'redux-saga/effects';
import * as Font from 'expo-font'

import * as constants from '../application/constants';
import { loadFontsActions } from '../stores/fonts';
import { LoadFonts } from '../stores/fonts';

export function* watchLoadFonts(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_FONTS_REQUEST, loadFonts);
}

export function* loadFonts(action: LoadFonts.Request): IterableIterator<CallEffect | PutEffect<LoadFonts.Result>> {
    try {
        yield call(Font.loadAsync, action.payload.fonts);
        yield put(loadFontsActions.success(action.payload.fonts));
    } catch (e) {
        yield put(loadFontsActions.failure(e.message, action.payload.fonts));
    }
}
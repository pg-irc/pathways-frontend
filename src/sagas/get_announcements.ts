// tslint:disable:no-expression-statement
import { takeLatest, ForkEffect, PutEffect, CallEffect, SelectEffect, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { getAnnoucements, APIResponse } from '../api';
import { loadCurrentLocaleCode } from '../locale';
import { LoadLocaleSuccessAction } from '../stores/locale/actions';
import { GetAnnoucementsSuccessAction, GetAnnoucementsFailureAction, getAnnoucementsFailure, getAnnoucementsSuccess } from '../stores/announcements';

export function* watchRequestGetAnnouncements(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_SUCCESS, requestGetAnnoucements);
}

function* requestGetAnnoucements(_: LoadLocaleSuccessAction): Result {
    const locale: string = yield call(loadCurrentLocaleCode);
    const result: APIResponse = yield call(getAnnoucements, locale);
    if (!result || result.hasError) {
        return yield put(getAnnoucementsFailure('Error getting announcements'));
    }
    yield put(getAnnoucementsSuccess(result.results));
}

type SuccessOrFailure = GetAnnoucementsSuccessAction | GetAnnoucementsFailureAction;

export type Result = IterableIterator<SelectEffect | CallEffect | PutEffect<SuccessOrFailure>>;
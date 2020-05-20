// tslint:disable:no-expression-statement
import { takeLatest, ForkEffect, PutEffect, CallEffect, SelectEffect, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { getAnnoucements, APIResponse } from '../api';
import { loadCurrentLocaleCode } from '../locale';
import { LoadLocaleSuccessAction } from '../stores/locale/actions';
import { GetAnnoucementsSuccessAction, GetAnnoucementsFailureAction, getAnnoucementsFailure, getAnnoucementsSuccess } from '../stores/announcements';
import { validateAnnouncementResponse } from '../validation/announcements';
import { Announcement } from '../validation/announcements/types';
import { ValidationResult } from '../validation/validation_result';

export function* watchRequestGetAnnouncements(): IterableIterator<ForkEffect> {
    yield takeLatest([constants.SAVE_LOCALE_SUCCESS, constants.LOAD_CURRENT_LOCALE_SUCCESS], requestGetAnnoucements);
}

function* requestGetAnnoucements(_: LoadLocaleSuccessAction): Result {
    const locale: string = yield call(loadCurrentLocaleCode);
    const result: APIResponse = yield call(getAnnoucements, locale);
    const announcements: ValidationResult<ReadonlyArray<Announcement>> = yield call(validateAnnouncementResponse, result.results);
    if (!result || result.hasError) {
        return yield put(getAnnoucementsFailure('Error getting announcements'));
    }
    yield put(getAnnoucementsSuccess(announcements.validData));
}

type SuccessOrFailure = GetAnnoucementsSuccessAction | GetAnnoucementsFailureAction;

export type Result = IterableIterator<SelectEffect | CallEffect | PutEffect<SuccessOrFailure>>;
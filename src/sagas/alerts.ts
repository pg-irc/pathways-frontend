// tslint:disable:no-expression-statement
import { takeLatest, ForkEffect, PutEffect, CallEffect, SelectEffect, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import { getAlerts, APIResponse } from '../api';
import { LoadLocaleSuccessAction, SaveLocaleSuccessAction } from '../stores/locale/actions';
import { GetAlertsSuccessAction, GetAlertsFailureAction, getAlertsFailure, getAlertsSuccess } from '../stores/content';
import { validateAlertResponse } from '../validation/content';
import { Alert } from '../validation/content/types';
import { ValidationResult } from '../validation/validation_result';

export function* watchRequestGetAlerts(): IterableIterator<ForkEffect> {
    yield takeLatest([constants.SAVE_LOCALE_SUCCESS, constants.LOAD_CURRENT_LOCALE_SUCCESS], requestGetAlerts);
}

function* requestGetAlerts(action: LoadLocaleSuccessAction | SaveLocaleSuccessAction): Result {
    const result: APIResponse = yield call(getAlerts, action.payload.localeCode);
    const alerts: ValidationResult<Alert> = yield call(validateAlertResponse, result.results);
    if (!result || result.hasError) {
        return yield put(getAlertsFailure('Error getting alerts'));
    }
    yield put(getAlertsSuccess(alerts.validData));
}

type SuccessOrFailure = GetAlertsSuccessAction | GetAlertsFailureAction;

export type Result = IterableIterator<SelectEffect | CallEffect | PutEffect<SuccessOrFailure>>;
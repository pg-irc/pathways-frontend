// tslint:disable:no-expression-statement
import { takeLatest, ForkEffect, PutEffect, CallEffect, SelectEffect, call, put } from 'redux-saga/effects';
import * as constants from '../application/constants';
import * as helpers from '../stores/helpers/make_action';
import { getAlerts, APIResponse } from '../api';
import { loadCurrentLocaleCode } from '../locale';
import { LoadLocaleSuccessAction } from '../stores/locale/actions';

export type GetAlertsSuccessAction = Readonly<ReturnType<typeof getAlertsSuccess>>;
export type GetAlertsFailureAction = Readonly<ReturnType<typeof getAlertsFailure>>;

// tslint:disable-next-line:typedef
const getAlertsSuccess = () => (
    helpers.makeAction(constants.GET_ALERTS_SUCCESS)
);

// tslint:disable-next-line:typedef
const getAlertsFailure = (error: string) => (
    helpers.makeAction(constants.GET_ALERTS_FAILURE, { error })
);

export function* watchRequestGetAlters(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.LOAD_CURRENT_LOCALE_SUCCESS, requestGetAlerts);
}

function* requestGetAlerts(_: LoadLocaleSuccessAction): Result {
    const locale: string = yield call(loadCurrentLocaleCode);
    const result: APIResponse = yield call(getAlerts, locale);
    if (!result || result.hasError) {
        return yield put(getAlertsFailure('Error getting alerts'));
    }
    yield put(getAlertsSuccess());
}

type SuccessOrFailure = GetAlertsSuccessAction | GetAlertsFailureAction;

export type Result = IterableIterator<SelectEffect | CallEffect | PutEffect<SuccessOrFailure>>;
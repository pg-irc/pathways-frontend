// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, takeLatest, SelectEffect, ForkEffect, put, call, select } from 'redux-saga/effects';
import * as constants from '../application/constants';
import * as helpers from '../stores/helpers/make_action';
import * as Notifications from 'expo-notifications';
import { putPushNotificationToken, APIResponse } from '../api';
import { PATHWAYS_API_KEY } from 'react-native-dotenv';
import { selectLocale } from '../selectors/locale/select_locale';
import { LocaleCode } from '../application/locales';

export type PushNotificationTokenRequestAction = Readonly<ReturnType<typeof pushNotificationTokenRequest>>;
export type PushNotificationTokenSuccessAction = Readonly<ReturnType<typeof pushNotificationTokenSuccess>>;
export type PushNotificationTokenFailureAction = Readonly<ReturnType<typeof pushNotificationTokenFailure>>;

// tslint:disable-next-line:typedef
export const pushNotificationTokenRequest = () => (
    helpers.makeAction(constants.PUSH_NOTIFICATION_TOKEN_REQUEST)
);

// tslint:disable-next-line:typedef
const pushNotificationTokenSuccess = () => (
    helpers.makeAction(constants.PUSH_NOTIFICATION_TOKEN_SUCCESS)
);

// tslint:disable-next-line:typedef
const pushNotificationTokenFailure = (error: string) => (
    helpers.makeAction(constants.PUSH_NOTIFICATION_TOKEN_FAILURE, { error })
);

export function* watchRequestPushNotificationToken(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.PUSH_NOTIFICATION_TOKEN_REQUEST, requestPushNotificationToken);
}

function* requestPushNotificationToken(_: PushNotificationTokenRequestAction): Result {

    const existingStatus: Notifications.NotificationPermissionsStatus = yield call(Notifications.getPermissionsAsync);
    // tslint:disable-next-line: no-let
    let finalStatus: Notifications.NotificationPermissionsStatus = existingStatus;
    if (!existingStatus.granted) {
        const newStatus = yield call(Notifications.requestPermissionsAsync);
        finalStatus = newStatus;
    }
    if (!finalStatus.granted) {
        return yield put(pushNotificationTokenFailure('Permission not granted for push notifications'));
    }
    // tslint:disable:no-any
    const token: any = yield call(Notifications.getExpoPushTokenAsync);
    if (token === '') {
        return yield put(pushNotificationTokenFailure('Error retrieving push notification token'));
    }
    const locale: LocaleCode = yield select(selectLocale);
    // tslint:disable:no-string-literal
    const result: APIResponse = yield call(putPushNotificationToken, token['data'], locale, PATHWAYS_API_KEY);
    if (!result || result.hasError) {
        // TODO log error to sentry
        return yield put(pushNotificationTokenFailure('Error posting push notification token'));
    }
    yield put(pushNotificationTokenSuccess());
}

type SuccessOrFailure = PushNotificationTokenSuccessAction | PushNotificationTokenFailureAction;

export type Result = IterableIterator<SelectEffect | CallEffect | PutEffect<SuccessOrFailure>>;

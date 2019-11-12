// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, takeLatest, SelectEffect, ForkEffect, put, call, select } from 'redux-saga/effects';
import * as constants from '../application/constants';
import * as helpers from '../stores/helpers/make_action';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { postPushNotificationToken } from '../api';
import { selectLocale } from '../selectors/locale/select_locale';
import { Locale } from '../locale';

export type PushNotificationPostRequestAction = Readonly<ReturnType<typeof request>>;
export type PushNotificationPostSuccessAction = Readonly<ReturnType<typeof success>>;
export type PushNotificationPostFailureAction = Readonly<ReturnType<typeof failure>>;

// tslint:disable-next-line:typedef
export const request = () => (
    helpers.makeAction(constants.POST_PUSH_NOTIFICATION_TOKEN_REQUEST)
);

// tslint:disable-next-line:typedef
const success = () => (
    helpers.makeAction(constants.POST_PUSH_NOTIFICATION_TOKEN_SUCCESS)
);

// tslint:disable-next-line:typedef
const failure = (error: string) => (
    helpers.makeAction(constants.POST_PUSH_NOTIFICATION_TOKEN_FAILURE, { error })
);

export function* watchRequestPostPushNotificationToken(): IterableIterator<ForkEffect> {
    yield takeLatest(constants.POST_PUSH_NOTIFICATION_TOKEN_REQUEST, requestPostPushNotificationToken);
}

function* requestPostPushNotificationToken(_: PushNotificationPostRequestAction): Result {
    const permission: Permissions.PermissionResponse = yield call(Permissions.getAsync, Permissions.NOTIFICATIONS);
    if (permission.status !== 'granted') {
        return yield put(failure('Permission not granted for push notifications'));
    }
    const token: string = yield call(Notifications.getExpoPushTokenAsync);
    if (token === '') {
        return yield put(failure('Error retrieving push notification token'));
    }
    const locale: Locale = yield select(selectLocale);
    const result = yield call(postPushNotificationToken, token, locale);
    if (!result || result.hasError) {
        return yield put(failure('Error posting push notification token'));
    }
    yield put(success());
}

type SuccessOrFailure = PushNotificationPostSuccessAction | PushNotificationPostFailureAction;

export type Result = IterableIterator<SelectEffect | CallEffect | PutEffect<SuccessOrFailure>>;

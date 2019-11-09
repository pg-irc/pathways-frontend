// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, takeLatest, ForkEffect, put, call } from 'redux-saga/effects';
import * as constants from '../application/constants';
import * as helpers from '../stores/helpers/make_action';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { postPushNotificationToken } from '../api';

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
    console.log('watcher');
    yield takeLatest(constants.POST_PUSH_NOTIFICATION_TOKEN_REQUEST, requestPostPushNotificationToken);
}

function* requestPostPushNotificationToken(_: PushNotificationPostRequestAction): Result {
    console.log('entered saga, asking permission...');
    const permission: Permissions.PermissionResponse = yield call(Permissions.getAsync, Permissions.NOTIFICATIONS);
    console.log('asked permission');
    if (permission.status !== 'granted') {
        console.log('permission not granted, done');
        return yield put(failure('Permission not granted for push notifications'));
    }
    console.log('getting token...');
    const token: string = yield call(Notifications.getExpoPushTokenAsync);
    if (token === '') {
        console.log('failed to get token');
        return yield put(failure('Error retrieving push notification token'));
    }
    console.log(`Got token ${token}, posting to server...`);
    const result = yield call(postPushNotificationToken, token);
    if (!result || result.hasError) {
        console.log(`failed to post token: ${result.message}`);
        return yield put(failure('Error posting push notification token'));
    }
    console.log('succeeded in posting token');
    yield put(success());
}

type SuccessOrFailure = PushNotificationPostSuccessAction | PushNotificationPostFailureAction;

export type Result = IterableIterator<CallEffect | PutEffect<SuccessOrFailure>>;

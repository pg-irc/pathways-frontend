// tslint:disable:no-expression-statement
import { CallEffect, PutEffect, takeLatest, ForkEffect } from 'redux-saga/effects';
import * as constants from '../application/constants';
import * as helpers from '../stores/helpers/make_action';

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
}

type SuccessOrFailure = PushNotificationPostSuccessAction | PushNotificationPostFailureAction;

export type Result = IterableIterator<CallEffect | PutEffect<SuccessOrFailure>>;

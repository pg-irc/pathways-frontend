// tslint:disable:no-expression-statement no-any
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { AnalyticsAsync } from './actions';
import { WatchedAction } from './watch_analytics';
import * as constants from '../../application/constants';
import { sendScreenHit, sendAnswerChosenEvent, sendBookmarkAddedEvent } from '../../application/google_analytics';

type AnalyticsActions = IterableIterator<CallEffect | PutEffect<AnalyticsAsync.SuccessAction | AnalyticsAsync.FailureAction>>;

export function* sendAnalyticsData(action: WatchedAction): AnalyticsActions {
    try {
        yield call(sendAnalyticsDataAsync, action);
        yield put(AnalyticsAsync.success());
    } catch (error) {
        console.error(`Failed to send analytics data (${error.message})`);
        yield put(AnalyticsAsync.failure(error.message));
    }
}

async function sendAnalyticsDataAsync(action: WatchedAction): Promise<void> {
    if (action.type === constants.ROUTE_CHANGED) {
        sendScreenHit(action);
    }
    if (action.type === constants.CHOOSE_ANSWER) {
        sendAnswerChosenEvent();
    }
    if (action.type === constants.ADD_TO_SAVED_TOPICS) {
        sendBookmarkAddedEvent();
    }
}

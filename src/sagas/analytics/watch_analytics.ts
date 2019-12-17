// tslint:disable:no-expression-statement no-any

import * as constants from '../../application/constants';
import { AnalyticsAsync } from '../../stores/analytics';
import { ChooseAnswerAction } from '../../stores/questionnaire';
import { RouteChangedAction } from '../../stores/router_actions';
import { AddToSavedListAction, ExpandDetailAction, ReduceDetailAction } from '../../stores/topics';
import { ForkEffect, takeLatest, call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import * as events from './events';

export type WatchedAction = RouteChangedAction | ChooseAnswerAction | AddToSavedListAction | ExpandDetailAction | ReduceDetailAction;

export function* watchAnalytics(): IterableIterator<ForkEffect> {
    yield takeLatest(
        [
            constants.ROUTE_CHANGED,
            constants.CHOOSE_ANSWER,
            constants.ADD_BOOKMARK,
            constants.EXPAND_DETAIL,
            constants.REDUCE_DETAIL,
        ],
        sendAnalyticsData);
}

type AnalyticsActions = IterableIterator<CallEffect | PutEffect<AnalyticsAsync.SuccessAction | AnalyticsAsync.FailureAction>>;

function* sendAnalyticsData(action: WatchedAction): AnalyticsActions {
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
        events.sendScreenHit(action);
    }
    if (action.type === constants.CHOOSE_ANSWER) {
        events.sendAnswerChosenEvent(action.payload.answerId);
    }
    if (action.type === constants.ADD_BOOKMARK) {
        events.sendBookmarkAddedEvent(action.payload.topicId);
    }
    if (action.type === constants.EXPAND_DETAIL) {
        events.sendExpandDetail(action.payload.contentId);
    }
    if (action.type === constants.REDUCE_DETAIL) {
        events.sendReduceDetail(action.payload.contentId);
    }
}

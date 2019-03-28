// tslint:disable:no-expression-statement

import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { sendAnalyticsData } from './send_analytics_data';

import * as constants from '../../application/constants';
import { ChooseAnswerAction } from '../../stores/questionnaire';
import { RouteChangedAction } from '../../stores/router_actions';
import { AddToSavedListAction } from '../../stores/topics';

export type WatchedAction = RouteChangedAction | ChooseAnswerAction | AddToSavedListAction;

export function* watchAnalytics(): IterableIterator<ForkEffect> {
    yield takeLatest(
        [
            constants.ROUTE_CHANGED,
            constants.CHOOSE_ANSWER,
            constants.ADD_TO_SAVED_TASKS,
        ],
        sendAnalyticsData);
}

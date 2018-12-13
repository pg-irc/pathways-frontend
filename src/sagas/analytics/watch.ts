// tslint:disable:no-expression-statement

import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { sendAnalyticsData } from './async';

import * as constants from '../../application/constants';
import { ChooseAnswerAction } from '../../stores/questionnaire';
import { RouteChangedAction } from '../../stores/router_actions';
import { AddToSavedListAction } from '../../stores/tasks';

export type WatchedAction = RouteChangedAction | ChooseAnswerAction | AddToSavedListAction;

export function* watchAnalytics(): IterableIterator<ForkEffect> {
    yield takeLatest(
        [
            constants.SET_ACTIVE_QUESTION,
            constants.CHOOSE_ANSWER,
        ],
        sendAnalyticsData);
}

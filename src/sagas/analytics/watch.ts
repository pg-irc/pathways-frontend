// tslint:disable:no-expression-statement

import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { sendAnalyticsData } from './async';

import * as constants from '../../application/constants';
import { SetActiveQuestionAction, ChooseAnswerAction } from '../../stores/questionnaire';

export type WatchedAction = SetActiveQuestionAction | ChooseAnswerAction;

export function* watchAnalytics(): IterableIterator<ForkEffect> {
    yield takeLatest(
        [
            constants.SET_ACTIVE_QUESTION,
            constants.CHOOSE_ANSWER,
        ],
        sendAnalyticsData);
}

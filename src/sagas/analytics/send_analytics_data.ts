// tslint:disable:no-expression-statement

import { Analytics as ExpoAnalytics, ScreenHit, Event } from 'expo-analytics';
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { GOOGLE_ANALYTICS_TRACKING_ID, DEBUG_GOOGLE_ANALYTICS } from 'react-native-dotenv';
import { AnalyticsAsync } from './actions';
import { WatchedAction } from './watch_analytics';
import * as constants from '../../application/constants';

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
    const analytics = setupExpoAnalyticsForAction(action);
    if (action.type === constants.ROUTE_CHANGED) {
        analytics.hit(new ScreenHit(action.payload.location.pathname));
    }
    if (action.type === constants.CHOOSE_ANSWER) {
        analytics.hit(new Event('Questionnaire', 'ChooseAnswer', 'no answer id'));
    }
    if (action.type === constants.ADD_TO_SAVED_TASKS) {
        analytics.hit(new Event('Bookmarks', 'SaveTopic', 'no topic id'));
    }
}

// tslint:disable-next-line:no-any
const setupExpoAnalyticsForAction = (action: WatchedAction): any => {
    const additionalParameters = action.type === constants.ROUTE_CHANGED ?
        { aip: 1, ul: action.payload.locale.code } : { aip: 1 };
    const debug = { debug: DEBUG_GOOGLE_ANALYTICS === 'true' };
    return new ExpoAnalytics(
        GOOGLE_ANALYTICS_TRACKING_ID,
        additionalParameters,
        debug,
    );
};

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
    const debug = DEBUG_GOOGLE_ANALYTICS === 'true';
    const analytics = new ExpoAnalytics(GOOGLE_ANALYTICS_TRACKING_ID, { aip: 1 }, { debug });
    const screenHit = buildScreenHitData(action);
    if (screenHit) {
        return analytics.hit(screenHit);
    }
    const event = buildEventData(action);
    if (event) {
        return analytics.event(event);
    }
}

// tslint:disable-next-line:no-any
const buildScreenHitData = (action: WatchedAction): any => {
    if (action.type === constants.ROUTE_CHANGED) {
        return new ScreenHit(action.payload.location.pathname);
    }
    return undefined;
};

// tslint:disable-next-line:no-any
const buildEventData = (action: WatchedAction): any => {
    if (action.type === constants.CHOOSE_ANSWER) {
        return new Event('Questionnaire', 'ChooseAnswer', 'no answer id');
    }
    if (action.type === constants.ADD_TO_SAVED_TASKS) {
        return new Event('Bookmarks', 'SaveTopic', 'no topic id');
    }
    return undefined;
};

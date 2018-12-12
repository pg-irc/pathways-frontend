// tslint:disable:no-expression-statement

import { Analytics as ExpoAnalytics, PageHit } from 'expo-analytics';
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { GOOGLE_ANALYTICS_TRACKING_ID } from 'react-native-dotenv';
import { AnalyticsAsync } from './actions';
import { WatchedAction } from './watch';

type AnalyticsActions = IterableIterator<CallEffect | PutEffect<AnalyticsAsync.SuccessAction | AnalyticsAsync.FailureAction>>;

interface AnalyticsData {
    readonly type: string;
}

export function* sendAnalyticsData(action: WatchedAction): AnalyticsActions {
    try {
        const data: AnalyticsData = { type: action.type };
        yield call(sendAnalyticsDataAsync, data);
        yield put(AnalyticsAsync.success());
    } catch (error) {
        console.error(`Failed to send analytics data (${error.message})`);
        yield put(AnalyticsAsync.failure(error.message));
    }
}

export async function sendAnalyticsDataAsync(_data: AnalyticsData): Promise<void> {
    // tslint:disable-next-line:no-null-keyword
    const analytics = new ExpoAnalytics(GOOGLE_ANALYTICS_TRACKING_ID, null, { debug: true });
    return analytics.hit(new PageHit('Home'));
}

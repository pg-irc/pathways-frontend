// tslint:disable:no-expression-statement

import { Analytics as ExpoAnalytics, PageHit } from 'expo-analytics';
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { GOOGLE_ANALYTICS_TRACKING_ID } from 'react-native-dotenv';
import { AnalyticsAsync } from './actions';
import { WatchedAction } from './watch';
import * as constants from '../../application/constants';
import { pathMatchesRoute, Routes } from '../../application/routing';

type AnalyticsActions = IterableIterator<CallEffect | PutEffect<AnalyticsAsync.SuccessAction | AnalyticsAsync.FailureAction>>;

interface AnalyticsData {
    readonly type: string;
}

const buildAnalyticsData = (action: WatchedAction): AnalyticsData => {
    switch (action.type) {
        case constants.ROUTE_CHANGED:
            if (pathMatchesRoute(action.payload.location.pathname, Routes.TaskDetail)) {
                return {
                    type: action.type,
                };
            }
            if (pathMatchesRoute(action.payload.location.pathname, Routes.Services)) {
                return {
                    type: action.type,
                };
            }
            break;
        case constants.CHOOSE_ANSWER:
            return {
                type: action.type,
            };
        case constants.ADD_TO_SAVED_TASKS:
            return {
                type: action.type,
            };
        default:
            break;
    }
    return {
        type: action.type,
    };
};

export function* sendAnalyticsData(action: WatchedAction): AnalyticsActions {
    try {
        const data = buildAnalyticsData(action);
        if (!data) {
            return;
        }
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

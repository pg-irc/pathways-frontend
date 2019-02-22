// tslint:disable:no-expression-statement no-any

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
    const analytics = buildExpoAnalytics(action);
    if (action.type === constants.ROUTE_CHANGED) {
        analytics.hit(createScreenHit(action.payload.location.pathname));
    }
    if (action.type === constants.CHOOSE_ANSWER) {
        analytics.hit(createAnswerChosenEvent());
    }
    if (action.type === constants.ADD_TO_SAVED_TASKS) {
        analytics.hit(createBookmarkAddedEvent());
    }
}

const buildExpoAnalytics = (action: WatchedAction): any => {
    const parameters = createGoogleAnalyticsParameters(action);
    const debug = createExpoAnalyticsDebugValue();
    return createExpoAnalytics(parameters, debug);
};

// See https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters for parameter reference.
// Add any additionally required parameters to this interface.
interface GoogleAnalyticsParameters {
    readonly aip: number;
    readonly ul?: string;
}

const createGoogleAnalyticsParameters = (action: WatchedAction): GoogleAnalyticsParameters => {
    if (action.type === constants.ROUTE_CHANGED) {
        return {
            aip: 1,
            ul: action.payload.locale.code,
        };
    }
    return {
        aip: 1,
    };
};

interface ExpoAnalyticsDebugValue {
    readonly debug: boolean;
}

const createExpoAnalyticsDebugValue = (): ExpoAnalyticsDebugValue => ({
    debug: DEBUG_GOOGLE_ANALYTICS === 'true',
});

const createExpoAnalytics = (parameters: GoogleAnalyticsParameters, debug: ExpoAnalyticsDebugValue): any => (
    new ExpoAnalytics(
        GOOGLE_ANALYTICS_TRACKING_ID,
        parameters,
        debug,
    )
);

const createScreenHit = (pathName: string): any => (
    new ScreenHit(pathName)
);

const createAnswerChosenEvent = (): any => (
    new Event('Questionnaire', 'ChooseAnswer', 'no answer id')
);

const createBookmarkAddedEvent = (): any => (
    new Event('Bookmarks', 'SaveTopic', 'no topic id')
);

// tslint:disable:no-expression-statement no-any

import { Analytics as ExpoAnalytics, ScreenHit, Event } from 'expo-analytics';
import { call, CallEffect, PutEffect, put } from 'redux-saga/effects';
import { GOOGLE_ANALYTICS_TRACKING_ID, DEBUG_GOOGLE_ANALYTICS } from 'react-native-dotenv';
import { AnalyticsAsync } from './actions';
import { WatchedAction } from './watch_analytics';
import * as constants from '../../application/constants';
import { RouteChangedAction } from '../../stores/router_actions';

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

const sendScreenHit = (action: RouteChangedAction): void => {
    const additionalParameters = createGoogleAnalyticsLanguageParameter(action);
    const analytics = createAnalytics(additionalParameters);
    const screenHit = createScreenHit(action.payload.location.pathname);
    analytics.hit(screenHit);
};

const sendAnswerChosenEvent = (): void => {
    const analytics = createAnalytics();
    const event = createEvent('Questionnaire', 'ChooseAnswer', 'no answer id');
    analytics.hit(event);
};

const sendBookmarkAddedEvent = (): void => {
    const analytics = createAnalytics();
    const event = createEvent('Bookmarks', 'SaveTopic', 'no topic id');
    analytics.hit(event);
};

const createScreenHit = (path: string): any => (
    new ScreenHit(path)
);

const createEvent = (category: string, action: string, label?: string, value?: number): any => (
    new Event(category, action, label, value)
);

interface GoogleAnalyticsLanguageParameter {
    readonly ul: string;
}

const createGoogleAnalyticsLanguageParameter = (action: RouteChangedAction): GoogleAnalyticsLanguageParameter => ({
    ul: action.payload.locale.code,
});

interface GoogleAnalyticsAnonymizeIPParameter {
    readonly aip: number;
}

const createGoogleAnalyticsAnonymizeIPParameter = (): GoogleAnalyticsAnonymizeIPParameter => ({
    aip: 1,
});

const createAnalytics = (additionalParameters?: object): any => {
    const parameters = {
        ...createGoogleAnalyticsAnonymizeIPParameter(),
        ...additionalParameters,
    };
    const debug = { debug: DEBUG_GOOGLE_ANALYTICS === 'true' };
    return new ExpoAnalytics(
        GOOGLE_ANALYTICS_TRACKING_ID,
        parameters,
        debug,
    );
};

// tslint:disable:no-expression-statement no-any
import { Analytics as ExpoAnalytics, ScreenHit, Event } from 'expo-analytics';
import { GOOGLE_ANALYTICS_TRACKING_ID, DEBUG_GOOGLE_ANALYTICS } from 'react-native-dotenv';
import { RouteChangedAction } from '../stores/router_actions';

export const sendScreenHit = (action: RouteChangedAction): void => {
    const additionalParameters = createGoogleAnalyticsLanguageParameter(action);
    const analytics = createAnalytics(additionalParameters);
    const screenHit = createScreenHit(action.payload.location.pathname);
    analytics.hit(screenHit);
};

export const sendAnswerChosenEvent = (): void => {
    const analytics = createAnalytics();
    const event = createEvent('Questionnaire', 'ChooseAnswer', 'no answer id');
    analytics.hit(event);
};

export const sendBookmarkAddedEvent = (): void => {
    const analytics = createAnalytics();
    const event = createEvent('Bookmarks', 'SaveTopic', 'no topic id');
    analytics.hit(event);
};

export const sendLinkPressedEvent = (currentPath: string, linkValue: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Links', `PressLinkOnScreen: ${currentPath}`, `value: ${linkValue}`);
    analytics.hit(event);
};

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

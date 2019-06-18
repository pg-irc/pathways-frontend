// tslint:disable:no-expression-statement no-any
import { Analytics as ExpoAnalytics, ScreenHit, Event } from 'expo-analytics';
import { GOOGLE_ANALYTICS_TRACKING_ID, DEBUG_GOOGLE_ANALYTICS } from 'react-native-dotenv';
import { RouteChangedAction } from '../../stores/router_actions';

export const sendScreenHit = (action: RouteChangedAction): void => {
    const additionalParameters = createGoogleAnalyticsLanguageParameter(action);
    const analytics = createAnalytics(additionalParameters);
    const screenHit = createScreenHit(action.payload.location.pathname);
    analytics.hit(screenHit);
};

export const sendAnswerChosenEvent = (answerId: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Questionnaire', 'AnswerChosen', answerId);
    analytics.hit(event);
};

export const sendBookmarkAddedEvent = (topicId: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Bookmarks', 'BookmarkAdded', topicId);
    analytics.hit(event);
};

export const sendLinkPressedEvent = (currentPath: string, linkContext: string, linkType: string, linkValue: string)
    : void => {
    const additionalParameters = createGoogleAnalyticsScreenNameParameter(currentPath);
    const analytics = createAnalytics(additionalParameters);
    const event = createEvent('Links', `LinkPressed:${linkValue}`, `${linkContext}:${linkType}`);
    analytics.hit(event);
};

export const buildLinkContext = (model: string, title: string): string => (
    `${model} - ${title}`
);

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

interface GoogleAnalyticsScreenNameParameter {
    readonly cd: string;
}

const createGoogleAnalyticsScreenNameParameter = (screenName: string): GoogleAnalyticsScreenNameParameter => ({
    cd: screenName,
});

interface GoogleAnalyticsAnonymizeIPParameter {
    readonly aip: number;
}

const createGoogleAnalyticsAnonymizeIPParameter = (): GoogleAnalyticsAnonymizeIPParameter => ({
    aip: 1,
});

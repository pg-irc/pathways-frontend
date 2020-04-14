// tslint:disable:no-expression-statement
import { Analytics as ExpoAnalytics, ScreenHit, Event } from 'expo-analytics';
import { GOOGLE_ANALYTICS_TRACKING_ID, DEBUG_GOOGLE_ANALYTICS } from 'react-native-dotenv';
import { RouteChangedAction } from '../../stores/router_actions';
import { HumanServiceData } from '../../validation/services/types';

export const sendScreenHit = (action: RouteChangedAction): void => {
    const additionalParameters = createGoogleAnalyticsLanguageParameter(action);
    const analytics = createAnalytics(additionalParameters);
    const screenHit = createScreenHit(action.payload.location.pathname);
    analytics.hit(screenHit);
};

export const sendAnswerChosenEvent = (answerId: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Questionnaire', 'AnswerChosen', [answerId]);
    analytics.hit(event);
};

export const sendBookmarkTopicEvent = (topicId: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Bookmarks', 'TopicBookmarkAdded', [topicId]);
    analytics.hit(event);
};

export const sendBookmarkServiceEvent = (service: HumanServiceData): void => {
    const analytics = createAnalytics();
    const event = createEvent('Bookmarks', 'ServiceBookmarkAdded', [service.id, service.name, service.organizationName]);
    analytics.hit(event);
};

export const sendSearchExecutedEvent = (searchTerm: string, searchLocation: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Search', 'SearchExecuted', [searchTerm, searchLocation]);
    analytics.hit(event);
};

export const sendOpenService = (service: HumanServiceData): void => {
    const analytics = createAnalytics();
    const event = createEvent('Services', 'ServiceOpened', [service.id, service.name, service.organizationName]);
    analytics.hit(event);
};

export const sendExpandDetail = (contentId: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Detail', 'DetailExpanded', [contentId]);
    analytics.hit(event);
};

export const sendCollapseDetail = (contentId: string): void => {
    const analytics = createAnalytics();
    const event = createEvent('Detail', 'DetailCollapsed', [contentId]);
    analytics.hit(event);
};

export const sendLinkPressedEvent = (currentPath: string, linkContext: string, linkType: string, linkValue: string)
    : void => {
    const additionalParameters = createGoogleAnalyticsScreenNameParameter(currentPath);
    const analytics = createAnalytics(additionalParameters);
    const event = createEvent('Links', `LinkPressed:${linkValue}`, [`${linkContext}:${linkType}`]);
    analytics.hit(event);
};

export const sendServicesCountEvent = (count: number): void => {
    const analytics = createAnalytics();
    const event = createEvent('MemoryReport', `ServicesCount: ${count}`);
    analytics.hit(event);
};

export const buildAnalyticsLinkContext = (model: string, title: string): string => (
    `${model} - ${title}`
);

// tslint:disable-next-line:no-any
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

// tslint:disable-next-line:no-any
const createScreenHit = (path: string): any => (
    new ScreenHit(path)
);

// tslint:disable-next-line:no-any
const createEvent = (category: string, action: string, label?: readonly string[], value?: number): any => (
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

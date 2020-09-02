// tslint:disable:no-expression-statement
import { Analytics as ExpoAnalytics, ScreenHit, Event } from 'expo-analytics';
import { GOOGLE_ANALYTICS_TRACKING_ID, DEBUG_GOOGLE_ANALYTICS } from 'react-native-dotenv';
import { RouteChangedAction } from '../../stores/router_actions';
import { HumanServiceData } from '../../validation/services/types';
import { AnalyticsLinkProps } from '../../stores/analytics';

export const sendScreenHit = (action: RouteChangedAction): void => {
    const additionalParameters = createGoogleAnalyticsLanguageParameter(action);
    const analytics = createAnalytics(additionalParameters);
    const screenHit = createScreenHit(action.payload.location.pathname);
    analytics.hit(screenHit);
};

export const sendAnswerChosenEvent = (answerId: string): void => {
    const event = createEvent('Questionnaire', 'AnswerChosen', [answerId]);
    analyticsHit(event);
};

export const sendBookmarkTopicEvent = (topicId: string): void => {
    const event = createEvent('Bookmarks', 'TopicBookmarkAdded', [topicId]);
    analyticsHit(event);
};

export const sendBookmarkServiceEvent = (service: HumanServiceData): void => {
    const event = createEvent('Bookmarks', 'ServiceBookmarkAdded', [service.id, service.name, service.organizationName]);
    analyticsHit(event);
};

export const sendSearchExecutedEvent = (searchTerm: string, searchLocation: string): void => {
    const event = createEvent('Search', 'SearchExecuted', [searchTerm, searchLocation]);
    analyticsHit(event);
};

export const sendOpenService = (service: HumanServiceData): void => {
    const event = createEvent('Services', 'ServiceOpened', [service.id, service.name, service.organizationName]);
    analyticsHit(event);
};

export const sendExpandDetail = (contentId: string): void => {
    const event = createEvent('Detail', 'DetailExpanded', [contentId]);
    analyticsHit(event);
};

export const sendCollapseDetail = (contentId: string): void => {
    const event = createEvent('Detail', 'DetailCollapsed', [contentId]);
    analyticsHit(event);
};

export const sendLinkPressedEvent = (analyticsLinkProps: AnalyticsLinkProps)
    : void => {
    const additionalParameters = createGoogleAnalyticsScreenNameParameter(analyticsLinkProps.currentPath);
    const analytics = createAnalytics(additionalParameters);
    const event = createEvent('Links', `LinkPressed:${analyticsLinkProps.linkValue}`, [`${analyticsLinkProps.linkContext}:${analyticsLinkProps.linkType}`]);
    analytics.hit(event);
};

export const sendServicesCountEvent = (count: number): void => {
    const event = createEvent('MemoryReport', `ServicesCount: ${count}`);
    analyticsHit(event);
};

export const buildAnalyticsLinkContext = (model: string, title: string): string => (
    `${model} - ${title}`
);

const analyticsHit = (event: Event): void => {
    const analytics = createAnalytics();
    analytics.hit(event);
};

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

import buildUrl from 'build-url';
import { matchPath } from 'react-router';
import { RouteComponentProps } from 'react-router-native';
import { History, Location } from 'history';
import { Id as LearnId } from '../stores/explore';
import { Id as TopicId } from '../stores/topics';
import * as R from 'ramda';
import { ServiceFeedback } from '../components/feedback/hooks/use_send_feedback';

// The property names of this structure are defined by the corresponding
// route definitions, e.g. parsing a url '/learn/1' which matches
// '/learn/:learnId' will put '1' in the attribute `learnId`.
export type RouteParameters = Partial<{
    readonly learnId: LearnId;
    readonly topicId: TopicId;
    readonly organizationId: string;
    readonly serviceId: string;
}>;

export type FeedbackState = Partial<{
    readonly otherFeedbackMode: 'OTHER' | 'REMOVE_SERVICE';
    readonly isOptionsModalVisible: 'visible' | 'hidden';
    readonly isReceiveUpdatesModalVisible: 'visible' | 'hidden';
    readonly serializedFeedback: string;
}>;

export type NonSerializedFeedbackState = Omit<FeedbackState, 'serializedFeedback'> & Partial<{ readonly feedback: ServiceFeedback; }>;

export type RouterProps = RouteComponentProps<RouteParameters>;

export enum Routes {
    Welcome,
    Onboarding,
    Questionnaire,
    Learn,
    LearnDetail,
    TopicDetail,
    Services,
    Help,
    RecommendedTopics,
    Bookmarks,
    Search,
    OrganizationDetail,
    ServiceDetail,
    Feedback,
}

export const routePathDefinition = (route: Routes): string => {
    switch (route) {
        default:
            throw new Error('Invalid route spec');
        case Routes.Welcome:
            return '/welcome';
        case Routes.Onboarding:
            return '/onboarding';
        case Routes.Help:
            return '/help';
        case Routes.Questionnaire:
            return '/questionnaire';
        case Routes.Learn:
            return '/learn';
        case Routes.LearnDetail:
            return '/learn/:learnId';
        case Routes.TopicDetail:
            return '/task/:topicId';
        case Routes.Services:
            return '/services/:topicId';
        case Routes.RecommendedTopics:
            return '/recommended-topics';
        case Routes.Bookmarks:
            return '/bookmarks';
        case Routes.Search:
            return '/search';
        case Routes.OrganizationDetail:
            return '/organization/:organizationId';
        case Routes.ServiceDetail:
            return '/service/:serviceId';
        case Routes.Feedback:
            return '/feedback/:serviceId';
    }
};

export const routePathWithoutParameter = (route: Routes): string => {
    if (routeHasParameter(route)) {
        throw new Error('The provided route cannot be a parameterized route');
    }

    return routePathDefinition(route);
};

export const routePathWithParameter = (route: Routes, parameter: string): string => {
    if (!routeHasParameter(route)) {
        throw new Error('The provided route must be a parameterized route');
    }

    return routePathDefinition(route).replace(/:.*/, parameter);
};

export const goToRouteWithoutParameter = (route: Routes, history: History): () => void => {
    const path = routePathWithoutParameter(route);
    // tslint:disable-next-line:no-expression-statement
    return (): void => history.push(path);
};

export const goToRouteWithParameter = (route: Routes, parameter: string, history: History, queryParams?: FeedbackState): () => void => (
    (): void => history.push(getPathWithOptionalQuery(routePathWithParameter(route, parameter), queryParams))
);

export const replaceRouteWithParameter = (route: Routes, parameter: string, history: History, queryParams?: FeedbackState): () => void => (
    (): void => history.replace(getPathWithOptionalQuery(routePathWithParameter(route, parameter), queryParams))
);

export const goBack = (history: History): void => (
    history.goBack()
);

export const pathMatchesRoute = (path: string, route: Routes): boolean => {
    return !!matchPath(path, { path: routePathDefinition(route), exact: true });
};

export const pathMatchesAnyRoute = (path: string, routes: ReadonlyArray<Routes>): boolean => (
    R.any((route: Routes): boolean => pathMatchesRoute(path, route), routes)
);

const routeHasParameter = (route: Routes): boolean => (
    routePathDefinition(route).indexOf(':') !== -1
);

// By (arguably poor) design the router's match.params is empty when trying to access it outside a "Route" component.
// This makes it impossible to access params in components like the Header and Footer.
// This helper function remedies this by parsing the parameters from the route url which is always available globally.
// For more details see: https://github.com/ReactTraining/react-router/issues/5870.
export const getParametersFromPath = (location: Location, route: Routes): RouteParameters => {
    const match = matchPath(location.pathname, {
        path: routePathDefinition(route),
        exact: true,
    });
    return match.params;
};

const getPathWithOptionalQuery = (path: string, queryParams?: FeedbackState): string => (
    queryParams ? `${path}${buildUrl('', { queryParams })}` : path
);

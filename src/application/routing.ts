// tslint:disable:no-expression-statement
import { matchPath } from 'react-router';
import { RouteComponentProps } from 'react-router-native';
import { History, Location, MemoryHistory, LocationState } from 'history';
import { Id as LearnId } from '../stores/explore';
import { Id as TopicId } from '../stores/topics';
import * as R from 'ramda';

// The property names of this structure are defined by the corresponding
// route definitions, e.g. parsing a url '/learn/1' which matches
// '/learn/:learnId' will put '1' in the attribute `learnId`.
export type RouteParameters = Partial<{
    readonly learnId: LearnId;
    readonly topicId: TopicId;
    readonly organizationId: string;
    readonly serviceId: string;
}>;

export interface LocationStateOffsets {
    readonly previousOffset?: number;
    readonly currentOffset?: number;
}

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
    Organization,
    ServiceDetail,
    OtherFeedback,
    ExplainFeedback,
    ContactInformation,
    ServiceReview,
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
        case Routes.Organization:
            return '/organization/:organizationId';
        case Routes.ServiceDetail:
            return '/service/:serviceId';
        case Routes.OtherFeedback:
            return '/feedback/:serviceId';
        case Routes.ExplainFeedback:
            return '/explainfeedback/:serviceId';
        case Routes.ContactInformation:
            return '/contact-information/:serviceId';
        case Routes.ServiceReview:
            return '/service-review/:serviceId';
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
    return (): void => history.push(path);
};

export const goToRouteWithParameter = (route: Routes, parameter: string, history: History, offset: number = 0): void => (
    history.push(routePathWithParameter(route, parameter), { previousOffset: offset })
);

export const goBack = (memoryHistory: MemoryHistory): void => {
    const oldTop: Location<LocationStateOffsets> = memoryHistory.entries.pop();
    memoryHistory.go(0);
    const newTop: Location<LocationStateOffsets> = R.last(memoryHistory.entries);
    const previousOffset = newTop.state?.previousOffset || 0;
    const currentOffset = oldTop.state?.previousOffset || 0;
    const newTopState = { previousOffset, currentOffset };
    memoryHistory.replace(newTop.pathname, newTopState);
};

export const backToServiceDetailOnFeedbackSubmit = (memoryHistory: MemoryHistory): void => {
    popFeedbackPathsFromHistory(memoryHistory);
    const positionOfCurrentPathInHistoryStack = 0;
    memoryHistory.go(positionOfCurrentPathInHistoryStack);
};

export const popFeedbackPathsFromHistory = (memoryHistory: MemoryHistory): void => {
    while (pathMatchesFeedbackRoute(R.last(memoryHistory.entries))) {
        memoryHistory.entries.pop();
    }
};

const pathMatchesFeedbackRoute = (location: Location<LocationState>): boolean => (
    pathMatchesAnyRoute(location.pathname, [Routes.OtherFeedback, Routes.ContactInformation])
);

export const backFromServiceReview = (memoryHistory: MemoryHistory): void => {
    popServiceReviewPathFromHistory(memoryHistory);
    const positionOfCurrentPathInHistoryStack = 0;
    memoryHistory.go(positionOfCurrentPathInHistoryStack);
};

export const popServiceReviewPathFromHistory = (memoryHistory: MemoryHistory): void => {
    while (pathMatchesServiceReviewRoute(R.last(memoryHistory.entries))) {
        memoryHistory.entries.pop();
    }
};

const pathMatchesServiceReviewRoute = (location: Location<LocationState>): boolean => (
    pathMatchesAnyRoute(location.pathname, [Routes.ServiceReview, Routes.ExplainFeedback])
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

export const isServiceReviewScreen = (memoryHistory: MemoryHistory): boolean => {
    if (!memoryHistory) {
        return false;
    }
    return pathMatchesRoute(R.last(memoryHistory.entries).pathname, Routes.ServiceReview);
};
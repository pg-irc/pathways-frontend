import { matchPath } from 'react-router';
import { RouteComponentProps } from 'react-router-native';
import { History, Location } from 'history';
import { Id as LearnId } from '../stores/explore';
import { Id as TopicId } from '../stores/topics';
import * as R from 'ramda';
export type PageId = string;

// The property names of this structure are defined by the corresponding
// route definitions, e.g. parsing a url '/learn/1' which matches
// '/learn/:learnId' will put '1' in the attribute `learnId`.
export interface MatchParameters {
    readonly learnId?: LearnId;
    readonly topicId?: TopicId;
}

export type RouterProps = RouteComponentProps<MatchParameters>;

export enum Routes {
    Welcome,
    Onboarding,
    Questionnaire,
    Learn,
    LearnDetail,
    TaskDetail,
    Services,
    Help,
    RecommendedTopics,
    BookmarkedTopics,
    Search,
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
        case Routes.TaskDetail:
            return '/task/:topicId';
        case Routes.Services:
            return '/services/:topicId';
        case Routes.RecommendedTopics:
            return '/recommended-topics';
        case Routes.BookmarkedTopics:
            return '/bookmarked-topics';
        case Routes.Search:
            return '/search';
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

export const goToRouteWithParameter = (route: Routes, parameter: string, history: History): () => void => {
    const path = routePathWithParameter(route, parameter);
    // tslint:disable-next-line:no-expression-statement
    return (): void => history.push(path);
};

export const goBack = (history: History): void => (
    history.goBack()
);

export const pathMatchesRoute = (path: string, route: Routes): boolean => {
    return !!matchPath(path, { path: routePathDefinition(route), exact: true });
};

export const pathMatchesAnyRoute = (path: string, routes: ReadonlyArray<Routes>): boolean => (
    R.any((route: Routes) => pathMatchesRoute(path, route), routes)
);

const routeHasParameter = (route: Routes): boolean => (
    routePathDefinition(route).indexOf(':') !== -1
);

export const isOnParentScreen = (path: string): boolean => (
    pathMatchesAnyRoute(
        path,
        [Routes.Help, Routes.Learn, Routes.Questionnaire, Routes.RecommendedTopics, Routes.BookmarkedTopics, Routes.Search],
    )
);

export const isOnChildScreen = (path: string): boolean => (
    pathMatchesAnyRoute(path, [Routes.TaskDetail, Routes.Services, Routes.LearnDetail])
);

// By (arguably poor) design the router's match.params is empty when trying to access it outside a "Route" component.
// This makes it impossible to access params in components like the Header and Footer.
// This helper function remedies this by parsing the parameters from the route url which is always available globally.
// For more details see: https://github.com/ReactTraining/react-router/issues/5870.
export const getParametersFromPath = (location: Location, route: Routes): MatchParameters => {
    const match = matchPath(location.pathname, {
        path: routePathDefinition(route),
        exact: true,
    });
    return match.params;
};
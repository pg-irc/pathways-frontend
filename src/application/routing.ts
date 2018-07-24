import { RouteComponentProps } from 'react-router-native';
import { History } from 'history';

// tslint:disable-next-line:no-any
export type RouterProps = RouteComponentProps<any>;

export enum Routes {
    Welcome,
    Home,
    Questionnaire,
    MyPlan,
    Learn,
    LearnDetail,
    TaskDetail,
    ArticleDetail,
}

export const routePath = (route: Routes): string => {
    switch (route) {
        default:
        case Routes.Welcome:
            return '/';
        case Routes.Home:
            return '/home';
        case Routes.Questionnaire:
            return '/questionnaire';
        case Routes.MyPlan:
            return '/my-plan';
        case Routes.Learn:
            return '/learn';
        case Routes.LearnDetail:
            return '/learn/:learnId';
        case Routes.TaskDetail:
            return '/task/:taskId';
        case Routes.ArticleDetail:
            return '/article/:articleId';
    }
};

export const routePathWithoutParameter = (route: Routes): string => {
    if (routeHasParameter(route)) {
        throw new Error('The provided route cannot be a parameterized route');
    }

    return routePath(route);
};

export const routePathWithParameter = (route: Routes, parameter: string): string => {
    if (!routeHasParameter(route)) {
        throw new Error('The provided route must be a parameterized route');
    }

    return routePath(route).replace(/:.*/, parameter);
};

export const goToRouteWithoutParameter = (route: Routes, history: History): void => {
    const path = routePathWithoutParameter(route);
    // tslint:disable-next-line:no-expression-statement
    history.push(path);
};

export const goToRouteWithParameter = (route: Routes, parameter: string, history: History): void => {
    const path = routePathWithParameter(route, parameter);
    // tslint:disable-next-line:no-expression-statement
    history.push(path);
};

const routeHasParameter = (route: Routes): boolean => (
    routePath(route).indexOf(':') !== -1
);

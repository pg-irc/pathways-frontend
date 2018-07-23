import { RouteComponentProps } from 'react-router-native';

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

export const routePathWithParameter = (route: Routes, parameter: string): string => (
    routePath(route).replace(/:.*/, parameter)
);

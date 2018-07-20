import { RouteComponentProps } from 'react-router-native';

// tslint:disable-next-line:no-any
export type RouterProps = RouteComponentProps<any>;

export const Routes = {
    welcome: '/',
    home: '/home',
    questionnaire: '/questionnaire',
    myPlan: '/my-plan',
    exploreSections: '/explore',
    exploreSectionDetail: '/explore/:sectionId',
    taskDetail: '/task/:taskId',
    articleDetail: '/article/:articleId',
};
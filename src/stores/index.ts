import { combineReducers } from 'redux';
import * as fonts from './fonts';
import * as pageSwitcher from './page_switcher';
import * as locale from './locale';
import * as questionnaire from './questionnaire';
import * as tasks from './tasks';
import * as services from './services';
import * as explore from './explore';
import * as taxonomies from './taxonomies';
import * as articles from './articles';

export interface Store {
    readonly fontsInStore: fonts.Store;
    readonly routeInStore: pageSwitcher.Store;
    readonly localeInStore: locale.Store;
    readonly questionnaireInStore: questionnaire.Store;
    readonly tasksInStore: tasks.Store;
    readonly servicesInStore: services.Store;
    readonly exploreSectionsInStore: explore.Store;
    readonly taxonomiesInStore: taxonomies.Store;
    readonly articlesInStore: articles.Store;
}

export const reducer = combineReducers<Store>({
    fontsInStore: fonts.reducer,
    routeInStore: pageSwitcher.reducer,
    localeInStore: locale.reducer,
    questionnaireInStore: questionnaire.reducer,
    tasksInStore: tasks.reducer,
    servicesInStore: services.reducer,
    exploreSectionsInStore: explore.reducer,
    taxonomiesInStore: taxonomies.reducer,
    articlesInStore: articles.reducer,
});

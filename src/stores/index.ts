import { combineReducers } from 'redux';
import * as fonts from './fonts';
import * as pageSwitcher from './page_switcher';
import * as locale from './locale';
import * as questionnaire from './questionnaire';
import * as tasks from './tasks';
import * as explore from './explore';

export interface Store {
    readonly fontsInStore: fonts.Store;
    readonly currentPageInStore: pageSwitcher.Store;
    readonly localeInStore: locale.Store;
    readonly questionnaireInStore: questionnaire.Store;
    readonly tasksInStore: tasks.Store;
    readonly exploreSectionsInStore: explore.Store;
}

export const reducer = combineReducers<Store>({
    fontsInStore: fonts.reducer,
    currentPageInStore: pageSwitcher.reducer,
    localeInStore: locale.reducer,
    questionnaireInStore: questionnaire.reducer,
    tasksInStore: tasks.reducer,
    exploreSectionsInStore: explore.reducer,
});

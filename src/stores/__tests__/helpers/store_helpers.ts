// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { Store } from '../../';
import * as fonts from '../../fonts';
import * as locale from '../../locale';
import * as pageSwitcher from '../../page_switcher';
import * as questionnaire from '../../questionnaire';
import * as tasks from '../../tasks';
import * as services from '../../services';
import * as explore from '../../explore';
import * as taxonomies from '../../taxonomies';
import * as articles from '../../articles';

export class ApplicationStoreBuilder {
    fontsInStore: fonts.Store;
    localeInStore: locale.Store;
    routeInStore: pageSwitcher.Store;
    questionnaireInStore: questionnaire.Store;
    tasksInStore: tasks.Store;
    servicesInStore: services.Store;
    exploreSectionsInStore: explore.Store;
    taxonomiesInStore: taxonomies.Store;
    articlesInStore: articles.Store;

    withLocaleStore(store: locale.Store): ApplicationStoreBuilder {
        this.localeInStore = store;
        return this;
    }

    build(): Store {
        return {
            fontsInStore: this.fontsInStore,
            localeInStore: this.localeInStore,
            routeInStore: this.routeInStore,
            questionnaireInStore: this.questionnaireInStore,
            tasksInStore: this.tasksInStore,
            servicesInStore: this.servicesInStore,
            exploreSectionsInStore: this.exploreSectionsInStore,
            taxonomiesInStore: this.taxonomiesInStore,
            articlesInStore: this.articlesInStore,
        };
    }
}
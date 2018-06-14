// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { Store } from '../../';
import * as fonts from '../../fonts';
import * as locale from '../../locale';
import * as pageSwitcher from '../../page_switcher';
import * as questionnaire from '../../questionnaire';
import * as tasks from '../../tasks';
import * as explore from '../../explore';

export class ApplicationStoreBuilder {
    fontsInStore: fonts.Store;
    localeInStore: locale.Store;
    routeInStore: pageSwitcher.Store;
    questionnaireInStore: questionnaire.Store;
    tasksInStore: tasks.Store;
    exploreSectionsInStore: explore.Store;

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
            exploreSectionsInStore: this.exploreSectionsInStore,
        };
    }
}
// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { Store } from '../..';
import * as fonts from '../../fonts';
import * as locale from '../../locale';
import * as questionnaire from '../../questionnaire';
import * as tasks from '../../tasks';
import * as services from '../../services';
import * as explore from '../../explore';
import * as taxonomies from '../../taxonomies';
import * as notifications from '../../notifications';
import * as serverVersion from '../../server_version';

// TODO remove this file
export class ApplicationStoreBuilder {
    fontsInStore: fonts.Store;
    localeInStore: locale.LocaleStore;
    questionnaireInStore: questionnaire.QuestionnaireStore;
    tasksInStore: tasks.TaskStore;
    servicesInStore: services.ServiceStore;
    exploreSectionsInStore: explore.ExploreStore;
    taxonomiesInStore: taxonomies.TaxonomyStore;
    notificationsInStore: notifications.NotificationStore;
    serverVersionInStore: serverVersion.ServerVersionStore;


    withLocaleStore(store: locale.LocaleStore): ApplicationStoreBuilder {
        this.localeInStore = store;
        return this;
    }

    build(): Store {
        return {
            fontsInStore: this.fontsInStore,
            localeInStore: this.localeInStore,
            questionnaireInStore: this.questionnaireInStore,
            tasksInStore: this.tasksInStore,
            servicesInStore: this.servicesInStore,
            exploreSectionsInStore: this.exploreSectionsInStore,
            taxonomiesInStore: this.taxonomiesInStore,
            notificationsInStore: this.notificationsInStore,
            serverVersionInStore: this.serverVersionInStore,
        };
    }
}
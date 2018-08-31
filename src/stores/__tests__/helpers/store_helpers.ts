// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { Store } from '../..';
import * as fonts from '../../fonts';
import * as locale from '../../locale';
import * as questionnaire from '../../questionnaire';
import * as tasks from '../../tasks';
import * as services from '../../services';
import * as explore from '../../explore';
import * as taxonomies from '../../taxonomies';
import * as articles from '../../articles';
import * as notifications from '../../notifications';

export class ApplicationStoreBuilder {
    fontsInStore: fonts.Store;
    localeInStore: locale.LocaleStore;
    questionnaireInStore: questionnaire.QuestionnaireStore;
    tasksInStore: tasks.TaskStore;
    servicesInStore: services.ServiceStore;
    exploreSectionsInStore: explore.ExploreStore;
    taxonomiesInStore: taxonomies.TaxonomyStore;
    articlesInStore: articles.ArticleStore;
    notificationsInStore: notifications.NotificationStore;

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
            articlesInStore: this.articlesInStore,
            notificationsInStore: this.notificationsInStore,
        };
    }
}
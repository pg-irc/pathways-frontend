// tslint:disable:no-class no-this readonly-keyword no-expression-statement
import { Store } from '../..';
import * as fonts from '../../fonts';
import * as locale from '../../locale';
import * as questionnaire from '../../questionnaire';
import * as tasks from '../../topics';
import * as services from '../../services';
import * as explore from '../../explore';
import * as taxonomies from '../../taxonomies';
import * as notifications from '../../notifications';
import * as onboarding from '../../onboarding';

export class ApplicationStoreBuilder {
    fontsInStore: fonts.Store;
    localeInStore: locale.LocaleStore;
    questionnaireInStore: questionnaire.QuestionnaireStore;
    tasksInStore: tasks.TopicStore;
    servicesInStore: services.ServiceStore;
    exploreSectionsInStore: explore.ExploreStore;
    taxonomiesInStore: taxonomies.TaxonomyStore;
    notificationsInStore: notifications.NotificationStore;
    onboardingInStore: onboarding.OnboardingStore;

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
            onboardingInStore: this.onboardingInStore
        };
    }
}
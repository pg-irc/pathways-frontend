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
import * as location from '../../manual_user_location';

export class ApplicationStoreBuilder {
    fontsInStore: fonts.FontsStore;
    localeInStore: locale.LocaleStore;
    questionnaireInStore: questionnaire.QuestionnaireStore;
    tasksInStore: tasks.TopicStore;
    servicesInStore: services.ServiceStore;
    exploreSectionsInStore: explore.ExploreStore;
    taxonomiesInStore: taxonomies.TaxonomyStore;
    notificationsInStore: notifications.NotificationStore;
    onboardingInStore: onboarding.OnboardingStore;
    location: location.ManualUserLocationStore;

    withLocaleStore(store: locale.LocaleStore): ApplicationStoreBuilder {
        this.localeInStore = store;
        return this;
    }

    build(): Store {
        return {
            fonts: this.fontsInStore,
            locale: this.localeInStore,
            questionnaire: this.questionnaireInStore,
            topics: this.tasksInStore,
            services: this.servicesInStore,
            exploreSections: this.exploreSectionsInStore,
            taxonomies: this.taxonomiesInStore,
            notifications: this.notificationsInStore,
            onboarding: this.onboardingInStore,
            manualUserLocation: this.location,
        };
    }
}
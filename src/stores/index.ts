import { combineReducers } from 'redux';
import * as fonts from './fonts';
import * as locale from './locale';
import * as questionnaire from './questionnaire';
import * as topics from './topics';
import * as services from './services';
import * as explore from './explore';
import * as taxonomies from './taxonomies';
import * as notifications from './notifications';
import * as onboarding from './onboarding';
export interface Store {
    readonly fontsInStore: fonts.Store;
    readonly localeInStore: locale.LocaleStore;
    readonly questionnaireInStore: questionnaire.QuestionnaireStore;
    readonly topicsInStore: topics.TopicStore;
    readonly servicesInStore: services.ServiceStore;
    readonly exploreSectionsInStore: explore.ExploreStore;
    readonly taxonomiesInStore: taxonomies.TaxonomyStore;
    readonly notificationsInStore: notifications.NotificationStore;
    readonly onboardingInStore: onboarding.OnboardingStore;
}

export const buildDefaultStore = (): Store => ({
    localeInStore: locale.buildDefaultStore(),
    fontsInStore: fonts.buildDefaultStore(),
    questionnaireInStore: questionnaire.buildDefaultStore(),
    topicsInStore: topics.buildDefaultStore(),
    servicesInStore: services.buildDefaultStore(),
    exploreSectionsInStore: explore.buildDefaultStore(),
    taxonomiesInStore: taxonomies.buildDefaultStore(),
    notificationsInStore: notifications.buildDefaultStore(),
    onboardingInStore: onboarding.buildDefaultStore(),
});

export const reducer = combineReducers<Store>({
    fontsInStore: fonts.reducer,
    localeInStore: locale.reducer,
    questionnaireInStore: questionnaire.reducer,
    topicsInStore: topics.reducer,
    servicesInStore: services.reducer,
    exploreSectionsInStore: explore.reducer,
    taxonomiesInStore: taxonomies.reducer,
    notificationsInStore: notifications.reducer,
    onboardingInStore: onboarding.reducer,
});

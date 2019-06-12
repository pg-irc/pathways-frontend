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
import * as location from './location';

export interface Store {
    readonly fonts: fonts.FontsStore;
    readonly locale: locale.LocaleStore;
    readonly questionnaire: questionnaire.QuestionnaireStore;
    readonly topics: topics.TopicStore;
    readonly services: services.ServiceStore;
    readonly exploreSections: explore.ExploreStore;
    readonly taxonomies: taxonomies.TaxonomyStore;
    readonly notifications: notifications.NotificationStore;
    readonly onboarding: onboarding.OnboardingStore;
    readonly location: location.LocationStore;
}

export const buildDefaultStore = (): Store => ({
    locale: locale.buildDefaultStore(),
    fonts: fonts.buildDefaultStore(),
    questionnaire: questionnaire.buildDefaultStore(),
    topics: topics.buildDefaultStore(),
    services: services.buildDefaultStore(),
    exploreSections: explore.buildDefaultStore(),
    taxonomies: taxonomies.buildDefaultStore(),
    notifications: notifications.buildDefaultStore(),
    onboarding: onboarding.buildDefaultStore(),
    location: location.buildDefaultStore(),
});

export const reducer = combineReducers<Store>({
    fonts: fonts.reducer,
    locale: locale.reducer,
    questionnaire: questionnaire.reducer,
    topics: topics.reducer,
    services: services.reducer,
    exploreSections: explore.reducer,
    taxonomies: taxonomies.reducer,
    notifications: notifications.reducer,
    onboarding: onboarding.reducer,
    location: location.reducer,
});

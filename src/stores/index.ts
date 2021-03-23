import { combineReducers } from 'redux';
import * as fonts from './fonts';
import * as locale from './locale';
import * as region from './region';
import * as questionnaire from './questionnaire';
import * as topics from './topics';
import * as services from './services';
import * as organizations from './organization';
import * as explore from './explore';
import * as taxonomies from './taxonomies';
import * as notifications from './notifications';
import * as userProfile from './user_profile';
import * as location from './manual_user_location';
import * as search from './search';
import * as feedback from './feedback';
import * as content from './content';
import * as userExperience from './user_experience';
import * as reviews from './reviews';

export interface Store {
    readonly fonts: fonts.FontsStore;
    readonly locale: locale.LocaleStore;
    readonly region: region.RegionStore;
    readonly questionnaire: questionnaire.QuestionnaireStore;
    readonly topics: topics.TopicStore;
    readonly services: services.ServiceStore;
    readonly organizations: organizations.OrganizationStore;
    readonly exploreSections: explore.ExploreStore;
    readonly taxonomies: taxonomies.TaxonomyStore;
    readonly notifications: notifications.NotificationStore;
    readonly userProfile: userProfile.UserProfileStore;
    readonly manualUserLocation: location.ManualUserLocationStore;
    readonly search: search.SearchStore;
    readonly feedback: feedback.FeedbackStore;
    readonly content: content.AlertsStore;
    readonly userExperience: userExperience.UserExperienceStore;
    readonly reviews: reviews.ReviewsStore;
}

export const buildDefaultStore = (): Store => ({
    locale: locale.buildDefaultStore(),
    region: region.buildDefaultStore(),
    fonts: fonts.buildDefaultStore(),
    questionnaire: questionnaire.buildDefaultStore(),
    topics: topics.buildDefaultStore(),
    services: services.buildDefaultStore(),
    organizations: organizations.buildDefaultStore(),
    exploreSections: explore.buildDefaultStore(),
    taxonomies: taxonomies.buildDefaultStore(),
    notifications: notifications.buildDefaultStore(),
    userProfile: userProfile.buildDefaultStore(),
    manualUserLocation: location.buildDefaultStore(),
    search: search.buildDefaultStore(),
    feedback: feedback.buildDefaultStore(),
    content: content.buildDefaultStore(),
    userExperience: userExperience.buildDefaultStore(),
    reviews: reviews.buildDefaultStore(),
});

export const reducer = combineReducers<Store>({
    fonts: fonts.reducer,
    locale: locale.reducer,
    region: region.reducer,
    questionnaire: questionnaire.reducer,
    topics: topics.reducer,
    services: services.reducer,
    organizations: organizations.reducer,
    exploreSections: explore.reducer,
    taxonomies: taxonomies.reducer,
    notifications: notifications.reducer,
    userProfile: userProfile.reducer,
    manualUserLocation: location.reducer,
    search: search.reducer,
    feedback: feedback.reducer,
    content: content.reducer,
    userExperience: userExperience.reducer,
    reviews: reviews.reducer,
});

import { combineReducers } from 'redux';
import * as fonts from './fonts';
import * as locale from './locale';
import * as questionnaire from './questionnaire';
import * as topics from './topics';
import * as services from './services';
import * as explore from './explore';
import * as taxonomies from './taxonomies';
import * as notifications from './notifications';
import * as userProfile from './user_profile';
import * as location from './manual_user_location';
import * as search from './search';
import * as headerMenu from './header_menu';
import * as feedback from './feedback';
import * as content from './content';
import * as listOffset from './list_offset';

export interface Store {
    readonly fonts: fonts.FontsStore;
    readonly locale: locale.LocaleStore;
    readonly questionnaire: questionnaire.QuestionnaireStore;
    readonly topics: topics.TopicStore;
    readonly services: services.ServiceStore;
    readonly exploreSections: explore.ExploreStore;
    readonly taxonomies: taxonomies.TaxonomyStore;
    readonly notifications: notifications.NotificationStore;
    readonly userProfile: userProfile.UserProfileStore;
    readonly manualUserLocation: location.ManualUserLocationStore;
    readonly search: search.SearchStore;
    readonly headerMenu: headerMenu.HeaderMenuStore;
    readonly feedback: feedback.FeedbackStore;
    readonly content: content.AlertsStore;
    readonly listOffset: listOffset.ListOffsetStore;
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
    userProfile: userProfile.buildDefaultStore(),
    manualUserLocation: location.buildDefaultStore(),
    search: search.buildDefaultStore(),
    headerMenu: headerMenu.buildDefaultStore(),
    feedback: feedback.buildDefaultStore(),
    content: content.buildDefaultStore(),
    listOffset: listOffset.buildDefaultStore(),
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
    userProfile: userProfile.reducer,
    manualUserLocation: location.reducer,
    search: search.reducer,
    headerMenu: headerMenu.reducer,
    feedback: feedback.reducer,
    content: content.reducer,
    listOffset: listOffset.reducer,
});

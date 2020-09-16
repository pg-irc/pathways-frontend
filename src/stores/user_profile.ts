import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { DataPersistence } from './persisted_data';
import { ClearAllUserDataAction } from './questionnaire/actions';
import { LatLong } from '../validation/latlong/types';

export type HideOnboardingAction = Readonly<ReturnType<typeof hideOnboarding>>;
export type DisableAnalyticsAction = Readonly<ReturnType<typeof disableAnalytics>>;
export type EnableCustomLatLongAction = Readonly<ReturnType<typeof enableCustomLatLong>>;
export type HidePartialLocalizationMessageAction = Readonly<ReturnType<typeof hidePartialLocalizationMessage>>;
export type HideLinkAlertsAction = Readonly<ReturnType<typeof hideLinkAlerts>>;

// tslint:disable-next-line:typedef
export const hideOnboarding = () => (
    helpers.makeAction(constants.HIDE_ONBOARDING)
);

// tslint:disable-next-line:typedef
export const disableAnalytics = (disable: boolean) => (
    helpers.makeAction(constants.DISABLE_ANALYTICS, { disable })
);

// tslint:disable-next-line:typedef
export const enableCustomLatLong = (customLatLong: LatLong) => (
    helpers.makeAction(constants.ENABLE_CUSTOM_LATLONG, { customLatLong })
);

// tslint:disable-next-line: typedef
export const hidePartialLocalizationMessage = () => (
    helpers.makeAction(constants.HIDE_PARTIAL_LOCALIZATION_MESSAGE)
);

// tslint:disable-next-line: typedef
export const hideLinkAlerts = () => (
    helpers.makeAction(constants.HIDE_LINK_ALERTS)
);

export type UserProfileAction =
    HideOnboardingAction |
    ClearAllUserDataAction |
    DisableAnalyticsAction |
    EnableCustomLatLongAction |
    HideLinkAlertsAction |
    DataPersistence.LoadSuccessAction |
    HidePartialLocalizationMessageAction;

export interface UserProfileStore {
    readonly showOnboarding: boolean;
    readonly disableAnalytics: boolean;
    readonly customLatLong: LatLong;
    readonly showPartialLocalizationMessage: boolean;
    readonly showLinkAlerts: boolean;
}

export const buildDefaultStore = (): UserProfileStore => ({
    showOnboarding: false,
    disableAnalytics: false,
    customLatLong: undefined,
    showPartialLocalizationMessage: true,
    showLinkAlerts: true,
});

export const reducer = (store: UserProfileStore = buildDefaultStore(), action?: UserProfileAction): UserProfileStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.HIDE_ONBOARDING:
            return ({
                ...store,
                showOnboarding: false,
            });
        case constants.DISABLE_ANALYTICS:
            return ({
                ...store,
                disableAnalytics: action.payload.disable,
            });
        case constants.ENABLE_CUSTOM_LATLONG:
            return({
                ...store,
                customLatLong: action.payload.customLatLong,
            });
        case constants.HIDE_PARTIAL_LOCALIZATION_MESSAGE:
            return ({
                ...store,
                showPartialLocalizationMessage: false,
            });
        case constants.HIDE_LINK_ALERTS:
            return ({
                ...store,
                showLinkAlerts: false,
            });
        case constants.LOAD_USER_DATA_SUCCESS:
            return ({
                ...store,
                showOnboarding: action.payload.showOnboarding,
                disableAnalytics: action.payload.disableAnalytics,
                customLatLong: action.payload.customLatLong,
                showPartialLocalizationMessage: action.payload.showPartialLocalizationMessage,
                showLinkAlerts: action.payload.showLinkAlerts,
            });
        case constants.CLEAR_ALL_USER_DATA:
            return ({
                ...store,
                showOnboarding: true,
                disableAnalytics: false,
                customLatLong: undefined,
                showPartialLocalizationMessage: true,
                showLinkAlerts: true,
            });
        default:
            return store;
    }
};
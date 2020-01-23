import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { DataPersistence } from './persisted_data';
import { ClearAllUserDataAction } from './questionnaire/actions';

export type SetOnboardingAction = Readonly<ReturnType<typeof setOnboarding>>;
export type DisableAnalyticsAction = Readonly<ReturnType<typeof disableAnalytics>>;
export type SetPartialLocalizationMessageAction = Readonly<ReturnType<typeof setShowPartialLocalizationMessage>>;

// tslint:disable-next-line:typedef
export const setOnboarding = () => (
    helpers.makeAction(constants.SET_ONBOARDING)
);

// tslint:disable-next-line:typedef
export const disableAnalytics = (disable: boolean) => (
    helpers.makeAction(constants.DISABLE_ANALYTICS, { disable })
);

// tslint:disable-next-line: typedef
export const setShowPartialLocalizationMessage = () => (
    helpers.makeAction(constants.SET_PARTIAL_LOCALIZATION_MESSAGE)
);

export type UserProfileAction =
    SetOnboardingAction |
    ClearAllUserDataAction |
    DisableAnalyticsAction |
    DataPersistence.LoadSuccessAction |
    SetPartialLocalizationMessageAction;

export interface UserProfileStore {
    readonly showOnboarding: boolean;
    readonly disableAnalytics: boolean;
    readonly showPartialLocalizationMessage: boolean;
}

export const buildDefaultStore = (): UserProfileStore => ({
    showOnboarding: false,
    disableAnalytics: false,
    showPartialLocalizationMessage: true,
});

export const reducer = (store: UserProfileStore = buildDefaultStore(), action?: UserProfileAction): UserProfileStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_ONBOARDING:
            return ({
                ...store,
                showOnboarding: false,
            });
        case constants.DISABLE_ANALYTICS:
            return ({
                ...store,
                disableAnalytics: action.payload.disable,
            });

        case constants.SET_PARTIAL_LOCALIZATION_MESSAGE:
            return ({
                ...store,
                showPartialLocalizationMessage: false,
            });
        case constants.LOAD_USER_DATA_SUCCESS:
            return ({
                ...store,
                showOnboarding: action.payload.showOnboarding,
                disableAnalytics: action.payload.disableAnalytics,
                showPartialLocalizationMessage: action.payload.showPartialLocalizationMessage,
            });
        case constants.CLEAR_ALL_USER_DATA:
            return ({
                ...store,
                showOnboarding: true,
                disableAnalytics: false,
                showPartialLocalizationMessage: true,
            });
        default:
            return store;
    }
};
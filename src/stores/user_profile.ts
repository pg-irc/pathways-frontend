import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { DataPersistence } from './persisted_data';
import { ClearAllUserDataAction } from './questionnaire/actions';

export type SetOnboardingAction = Readonly<ReturnType<typeof setOnboarding>>;
export type DisableAnalyticsAction = Readonly<ReturnType<typeof disableAnalytics>>;

// tslint:disable-next-line:typedef
export const setOnboarding = () => (
    helpers.makeAction(constants.SET_ONBOARDING)
);

// tslint:disable-next-line:typedef
export const disableAnalytics = () => (
    helpers.makeAction(constants.DISABLE_ANALYTICS)
);

export type OnboardingAction =
    SetOnboardingAction |
    ClearAllUserDataAction |
    DisableAnalyticsAction |
    DataPersistence.LoadSuccessAction;

export interface OnboardingStore {
    readonly showOnboarding: boolean;
    readonly disableAnalytics: boolean;
}

export const buildDefaultStore = (): OnboardingStore => ({
    showOnboarding: false,
    disableAnalytics: false,
});

export const reducer = (store: OnboardingStore = buildDefaultStore(), action?: OnboardingAction): OnboardingStore => {
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
                disableAnalytics: true,
            });
        case constants.LOAD_USER_DATA_SUCCESS:
            return ({
                ...store,
                showOnboarding: action.payload.showOnboarding,
                disableAnalytics: action.payload.disableAnalytics,
            });
        case constants.CLEAR_ALL_USER_DATA:
            return ({
                ...store,
                showOnboarding: true,
                disableAnalytics: false,
            });
        default:
            return store;
    }
};
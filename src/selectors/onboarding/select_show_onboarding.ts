import { Store } from '../../stores';

export const selectShowOnboarding = (appStore: Store): boolean => {
    return appStore.onboarding.showOnboarding;
};

export const selectDisableAnalytics = (appStore: Store): boolean => {
    return appStore.onboarding.disableAnalytics;
};
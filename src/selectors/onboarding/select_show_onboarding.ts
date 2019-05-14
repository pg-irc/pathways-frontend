import { Store } from '../../stores';

export const selectShowOnboarding = (appStore: Store): boolean => {
    return appStore.onboardingInStore.showOnboarding;
};
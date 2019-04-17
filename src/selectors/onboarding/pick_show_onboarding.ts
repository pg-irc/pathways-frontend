import { Store } from '../../stores';

export const pickShowOnboarding = (appStore: Store): boolean => {
    return appStore.onboardingInStore.showOnboarding;
};
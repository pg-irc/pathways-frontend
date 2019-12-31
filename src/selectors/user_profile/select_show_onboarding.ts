import { Store } from '../../stores';

export const selectShowOnboarding = (appStore: Store): boolean => {
    return appStore.userProfile.showOnboarding;
};

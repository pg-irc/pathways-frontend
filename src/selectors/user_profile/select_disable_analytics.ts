import { Store } from '../../stores';

export const selectDisableAnalytics = (appStore: Store): boolean => {
    return appStore.userProfile.disableAnalytics;
};

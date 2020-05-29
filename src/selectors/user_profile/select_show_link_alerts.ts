import { Store } from '../../stores';

export const selectShowLinkAlerts = (appStore: Store): boolean => {
    return appStore.userProfile.showLinkAlerts;
};

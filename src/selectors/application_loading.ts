import { Store } from '../stores';

export const isApplicationLoading = (appStore: Store): boolean => {
    return appStore.fontsInStore.loading ||
        appStore.localeInStore.loading;
};

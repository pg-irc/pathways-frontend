import {} from '../application/store';
import * as app from '../application/store';

export const isApplicationLoading = (appStore: app.Store): boolean => {
    return appStore.applicationState.fontsInStore.loading ||
        appStore.applicationState.localeInStore.loading;
};

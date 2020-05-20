import { Store } from '../../stores';
import { Alert } from '../../validation/content/types';

export const selectAlerts = (appStore: Store): ReadonlyArray<Alert> => {
    return appStore.content.alerts;
};

import { Store } from '../../stores';

export const selectServiceFeedbackEnabled = (appStore: Store): boolean => (
    appStore.services.serviceFeedbackEnabled
);

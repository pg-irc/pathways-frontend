import { Store } from '../stores';

export const selectIsSending = (appStore: Store): boolean => (
    appStore.reviews.isSending || appStore.feedback.isSending
);

import { Store } from '../../stores';

export const selectIsSendingReview = (appStore: Store): boolean => (
    appStore.reviews.isSending
);

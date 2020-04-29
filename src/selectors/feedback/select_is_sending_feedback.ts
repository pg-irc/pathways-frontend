import { Store } from '../../stores';

export const selectIsSendingFeedback = (store: Store): boolean => (
    store.feedback.isSending
);

import { Store } from '../../stores';
import { FeedbackModal } from '../../stores/feedback/types';

export const selectFeedbackModal = (store: Store): FeedbackModal => (
    store.feedback.modal
);

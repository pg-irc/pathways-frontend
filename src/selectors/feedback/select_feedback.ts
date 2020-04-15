import { Store } from '../../stores';
import { Feedback } from '../../stores/feedback/types';

export const selectFeedback = (store: Store): Feedback => (
    store.feedback.feedback
);

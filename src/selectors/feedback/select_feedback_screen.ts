import { Store } from '../../stores';
import { FeedbackScreen } from '../../stores/feedback/types';

export const selectFeedbackScreen = (store: Store): FeedbackScreen => (
    store.feedback.screen
);

import * as R from 'ramda';
import { FeedbackField, Feedback, FeedbackStore } from '../../stores/feedback/types';

export const pickSendableFeedback = (store: FeedbackStore): Feedback => (
    R.pickBy(
        isStringOrSendableFeedbackField,
        store.feedback,
    )
);

const isStringOrSendableFeedbackField = (item: string | FeedbackField): boolean =>
    typeof item === 'string' || item.shouldSend;

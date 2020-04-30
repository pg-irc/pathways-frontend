import * as R from 'ramda';
import { FeedbackField, Feedback, FeedbackStore } from '../../stores/feedback/types';

export const pickSendableFeedback = (store: FeedbackStore): Feedback => {
    if (store.feedback.type === 'service_feedback') {
        return R.pickBy(
            isTypeOrSendableFeedbackField,
            store.feedback,
        );
    }

    return R.pickBy(
        isTypeOrStringField,
        store.feedback,
    );
};

const isTypeOrSendableFeedbackField = (value: FeedbackField, key: keyof Feedback): boolean =>
    key === 'type' || value.shouldSend;

const isTypeOrStringField = (value: string, key: keyof Feedback): boolean =>
    key === 'type' || typeof value === 'string';

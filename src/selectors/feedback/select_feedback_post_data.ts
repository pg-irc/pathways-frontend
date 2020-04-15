import * as R from 'ramda';
import { Store } from '../../stores';
import { FeedbackPostData }  from './types';
import { toFeedbackPostData } from './to_feedback_post_data';
import { pickSendableFeedback } from './pick_sendable_feedback';

export const selectFeedbackPostData = (store: Store, serviceId: string): undefined | FeedbackPostData => {
    const feedback = pickSendableFeedback(store.feedback);
    const userInformation = store.feedback.userInformation;

    if (R.isEmpty(feedback)) {
        return undefined;
    }

    return toFeedbackPostData(feedback, userInformation, serviceId);
};

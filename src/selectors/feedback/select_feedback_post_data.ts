import * as R from 'ramda';
import { Store } from '../../stores';
import { FeedbackPostData }  from './types';
import { buildFeedbackToPost } from './build_feedback_to_post';
import { buildFeedbackPostPayload } from './build_feedback_post_payload';
import { selectServiceById } from '../services/select_service_by_id';
import { pickFeedbackUserInformation } from './pick_feedback_user_information';

export const selectFeedbackPostData = (store: Store, serviceId: string): undefined | FeedbackPostData => {
    const feedback = buildFeedbackPostPayload(store.feedback);
    const userInformation = pickFeedbackUserInformation(store);
    const serviceInformation = selectServiceById(store, serviceId);

    if (R.isEmpty(feedback)) {
        return undefined;
    }

    return buildFeedbackToPost(feedback, userInformation, serviceInformation);
};

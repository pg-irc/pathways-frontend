import { Feedback } from '../../stores/feedback/types';
import { FeedbackPostData }  from './types';
import { UserInformation } from '../../stores/feedback/types';
import { buildFeedbackContentToPost } from './build_feedback_content_to_post';
import { buildFeedbackAuthorDataToPost } from './build_feedback_author_data_to_post';
import { HumanServiceData } from '../../validation/services/types';

export const buildFeedbackToPost = (feedbackData: Feedback,
                                    userData: undefined | UserInformation,
                                    serviceData: HumanServiceData): FeedbackPostData => {

    const feedbackContentToPost = buildFeedbackContentToPost(feedbackData, serviceData);
    const authorDataToPost = userData ? buildFeedbackAuthorDataToPost(userData) : {};

    return {
        ...feedbackContentToPost,
        ...authorDataToPost,
    };
};

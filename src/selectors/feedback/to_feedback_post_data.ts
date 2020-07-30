import { Feedback } from '../../stores/feedback/types';
import { FeedbackPostData }  from './types';
import { UserInformation } from '../../stores/feedback/types';
import { toFeedbackPostDataContent } from './to_feedback_post_data_content';
import { toFeedbackPostDataAuthor } from './to_feedback_post_data_author';
import { HumanServiceData } from '../../validation/services/types';

export const toFeedbackPostData = (feedbackData: Feedback,
                                    userData: undefined | UserInformation,
                                    serviceData: HumanServiceData): FeedbackPostData => {

    const feedbackToPost = toFeedbackPostDataContent(feedbackData, serviceData);
    const authorDataToPost = userData ? toFeedbackPostDataAuthor(userData) : {};

    return {
        ...feedbackToPost,
        ...authorDataToPost,
    };
};

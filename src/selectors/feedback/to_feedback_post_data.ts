import { Feedback } from '../../stores/feedback/types';
import { FeedbackPostData }  from './types';
import { UserInformation } from '../../stores/feedback/types';
import { toFeedbackPostDataContent } from './to_feedback_post_data_content';
import { toFeedbackPostDataAuthor } from './to_feedback_post_data_author';

export const toFeedbackPostData = (feedback: Feedback, userInformation: undefined | UserInformation, serviceId: string): FeedbackPostData => {
    const feedbackPostContent = toFeedbackPostDataContent(feedback, serviceId);

    if (!userInformation) {
        return feedbackPostContent;
    }

    const feedbackPostDataAuthor = toFeedbackPostDataAuthor(userInformation);

    return {
        ...feedbackPostContent,
        ...feedbackPostDataAuthor,
    };
};

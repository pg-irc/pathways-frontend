import { Feedback, FeedbackField } from '../../stores/feedback/types';
import { FeedbackPostDataContent }  from './types';

export const toFeedbackPostDataContent = (feedback: Feedback, serviceId: string): FeedbackPostDataContent => {
    switch (feedback.type) {
        case 'service_feedback':
            return {
                bc211Id: serviceId,
                name: undefinedOrFeedbackFieldValue(feedback.name),
                organization: undefinedOrFeedbackFieldValue(feedback.organization),
                description: undefinedOrFeedbackFieldValue(feedback.description),
                address: undefinedOrFeedbackFieldValue(feedback.address),
                phone: undefinedOrFeedbackFieldValue(feedback.phone),
                website: undefinedOrFeedbackFieldValue(feedback.website),
                email: undefinedOrFeedbackFieldValue(feedback.email),
            };
        case 'other_feedback':
            return {
                bc211Id: serviceId,
                other: feedback.value,
            };
        case 'remove_service':
            return {
                bc211Id: serviceId,
                removalReason: feedback.reason,
            };
        default:
            return {
                bc211Id: serviceId,
            };
    }
};

const undefinedOrFeedbackFieldValue = (field: undefined | FeedbackField): undefined | string => (
    field && field.value
);
import { Feedback } from '../../stores/feedback/types';
import { FeedbackPostDataContent }  from './types';

export const toFeedbackPostDataContent = (feedback: Feedback, serviceId: string): FeedbackPostDataContent => {
    switch (feedback.type) {
        case 'service_feedback':
            return {
                bc211Id: serviceId,
                name: feedback.name?.value,
                organization: feedback.organization?.value,
                description: feedback.description?.value,
                address: feedback.address?.value,
                phone: feedback.phone?.value,
                website: feedback.website?.value,
                email: feedback.email?.value,
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

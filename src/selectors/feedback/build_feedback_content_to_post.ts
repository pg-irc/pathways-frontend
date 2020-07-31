import { Feedback } from '../../stores/feedback/types';
import { FeedbackContentToPost }  from './types';
import { HumanServiceData } from '../../validation/services/types';

export const buildFeedbackContentToPost = (feedback: Feedback, serviceData: HumanServiceData): FeedbackContentToPost => {
    switch (feedback.type) {
        case 'service_feedback':
            return {
                bc211Id: serviceData.id,
                bc211ServiceName: serviceData.name,
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
                bc211Id: serviceData.id,
                bc211ServiceName: serviceData.name,
                other: feedback.value,
            };
        case 'remove_service':
            return {
                bc211Id: serviceData.id,
                bc211ServiceName: serviceData.name,
                removalReason: feedback.reason,
            };
        default:
            throw new Error('Unknown service feedback type');
    }
};

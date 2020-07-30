import { Feedback } from '../../stores/feedback/types';
import { FeedbackPostDataContent }  from './types';
import { HumanServiceData } from '../../validation/services/types';

export const toFeedbackPostDataContent = (feedback: Feedback, serviceData: HumanServiceData): FeedbackPostDataContent => {
    switch (feedback.type) {
        case 'service_feedback':
            return {
                bc211Id: serviceData.id,
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
                other: feedback.value,
            };
        case 'remove_service':
            return {
                bc211Id: serviceData.id,
                removalReason: feedback.reason,
            };
        default:
            return {
                bc211Id: serviceData.id,
            };
    }
};

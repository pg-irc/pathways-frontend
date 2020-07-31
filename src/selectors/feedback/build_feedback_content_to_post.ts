import { Feedback } from '../../stores/feedback/types';
import { FeedbackContentToPost }  from './types';
import { HumanServiceData } from '../../validation/services/types';

export const buildFeedbackContentToPost = (feedback: Feedback, serviceData: HumanServiceData): FeedbackContentToPost => {
    const serviceIdentification = {
        bc211Id: serviceData.id,
        bc211ServiceName: serviceData.name,
        bc211OrganizationName: serviceData.organizationName,
    };
    switch (feedback.type) {
        case 'service_feedback':
            return {
                ...serviceIdentification,
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
                ...serviceIdentification,
                other: feedback.value,
            };
        case 'remove_service':
            return {
                ...serviceIdentification,
                removalReason: feedback.reason,
            };
        default:
            throw new Error('Unknown service feedback type');
    }
};

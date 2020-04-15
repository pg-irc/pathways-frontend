import { UserInformation } from '../../stores/feedback/types';
import { FeedbackPostDataAuthor }  from './types';

export const toFeedbackPostDataAuthor = (userInformation: UserInformation): FeedbackPostDataAuthor => ({
    authorIsEmployee: userInformation.isEmployee === true ? 'true' : undefined,
    authorEmail: userInformation.email,
    authorName: userInformation.name,
    authorJobTitle: userInformation.jobTitle,
    authorOrganization: userInformation.organizationName,
});

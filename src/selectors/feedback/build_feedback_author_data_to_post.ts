import { UserInformation } from '../../stores/feedback/types';
import { FeedbackAuthorDataToPost }  from './types';

export const buildFeedbackAuthorDataToPost = (userInformation: UserInformation): FeedbackAuthorDataToPost => ({
    authorIsEmployee: userInformation.isEmployee === true ? 'true' : 'false',
    authorEmail: userInformation.email,
    authorName: userInformation.name,
    authorJobTitle: userInformation.jobTitle,
    authorOrganization: userInformation.organizationName,
});

import { Store } from '../../stores';
import { UserInformation } from '../../stores/feedback/types';

export const pickFeedbackUserInformation = (store: Store): UserInformation | undefined => (
    store.feedback.userInformation
);

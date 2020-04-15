import { Store } from '../../stores';
import { UserInformation } from '../../stores/feedback/types';

export const selectFeedbackUserInformation = (store: Store): undefined | UserInformation => (
    store.feedback.userInformation
);

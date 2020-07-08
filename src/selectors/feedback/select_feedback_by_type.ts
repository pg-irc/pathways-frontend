import { Store } from '../../stores';
import { selectFeedback } from './select_feedback';

export const selectFeedbackByType = (store: Store): string => {
    const feedback = selectFeedback(store);

    if (!feedback) {
        return undefined;
    }

    switch (feedback.type) {
        case 'remove_service':
            return feedback.reason;
        case 'other_feedback':
            return feedback.value;
        case 'service_feedback':
        default:
            return undefined;
    }
};

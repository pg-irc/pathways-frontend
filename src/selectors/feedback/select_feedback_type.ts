import { Store } from '../../stores';
import { selectFeedback } from './select_feedback';

export const selectFeedbackType = (store: Store): string => {
    const feedback = selectFeedback(store);

    if (!feedback) {
        return undefined;
    }

    return feedback.type;
};

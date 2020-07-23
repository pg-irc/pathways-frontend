import { Store } from '../../stores';
import { selectFeedback } from './select_feedback';
import { getEmptyServiceFeedback } from '../../stores/feedback';
import { ServiceFeedback } from '../../stores/feedback/types';

export const selectServiceFeedback = (store: Store): ServiceFeedback => {
    const feedback = selectFeedback(store);

    if (feedback?.type === 'service_feedback') {
        return feedback;
    }

    return getEmptyServiceFeedback();
};
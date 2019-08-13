import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/topics';
import { isValidServicesForTopic, isErrorServicesForTopic, buildEmptyServicesForTopic } from '../../stores/services';
import { SelectorTopicServices } from './types';
import { toValidSelectorTopicServices } from './to_valid_selector_topic_services';
import { toErrorSelectorTopicServices } from './to_error_selector_topic_services';
import * as constants from '../../application/constants';

export const selectTopicServices = (topicId: TaskId, store: Store): SelectorTopicServices => {
    const topicServices = store.services.servicesByTopic[topicId] || buildEmptyServicesForTopic();
    if (isValidServicesForTopic(topicServices)) {
        return toValidSelectorTopicServices(topicServices, store.services.services);
    }
    if (isErrorServicesForTopic(topicServices)) {
        return toErrorSelectorTopicServices(topicServices);
    }
    return { type: constants.TOPIC_SERVICES_LOADING };
};

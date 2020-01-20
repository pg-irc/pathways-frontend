import { Store } from '../../stores';
import { Id as TopicId } from '../../stores/topics';
import { buildInitialEmptyServicesForTopic } from '../../stores/services';
import { isValidServicesForTopic } from '../../stores/services/is_valid_services_for_topic';
import { isErrorServicesForTopic } from '../../stores/services/is_error_services_for_topic';
import { SelectorTopicServices } from './types';
import { toValidSelectorTopicServices } from './to_valid_selector_topic_services';
import { toErrorSelectorTopicServices } from './to_error_selector_topic_services';
import { isLoadingServicesForTopic } from '../../stores/services/is_loading_services_for_topic';
import { toLoadingSelectorTopicServices } from './to_loading_selector_topic_services';

export const selectTopicServices = (topicId: TopicId, store: Store): SelectorTopicServices => {
    const topicServices = store.services.servicesByTopic[topicId] || buildInitialEmptyServicesForTopic();
    if (isValidServicesForTopic(topicServices)) {
        return toValidSelectorTopicServices(topicServices, store.services.services);
    }
    if (isErrorServicesForTopic(topicServices)) {
        return toErrorSelectorTopicServices(topicServices);
    }
    if (isLoadingServicesForTopic(topicServices)) {
        return toLoadingSelectorTopicServices();
    }
    return buildInitialEmptyServicesForTopic();
};

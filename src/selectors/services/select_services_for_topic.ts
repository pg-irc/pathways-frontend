import { Store } from '../../stores';
import { Id as TopicId } from '../../stores/topics';
import { buildInitialEmptyServicesForTopic } from '../../stores/services';
import { isValidServicesForTopic } from '../../stores/services/is_valid_services_for_topic';
import { isErrorServicesForTopic } from '../../stores/services/is_error_services_for_topic';
import { SelectorTopicServices } from './types';
import { toSelectorValidServicesForTopic } from './to_selector_valid_services_for_topic';
import { toSelectorErrorServicesForTopic } from './to_selector_error_services_for_topic';
import { isLoadingServicesForTopic } from '../../stores/services/is_loading_services_for_topic';
import { toSelectorLoadingServicesForTopic } from './to_loading_selector_topic_services';

export const selectServicesForTopic = (topicId: TopicId, store: Store): SelectorTopicServices => {
    const topicServices = store.services.servicesByTopic[topicId] || buildInitialEmptyServicesForTopic();
    if (isValidServicesForTopic(topicServices)) {
        return toSelectorValidServicesForTopic(topicServices, store.services.services);
    }
    if (isErrorServicesForTopic(topicServices)) {
        return toSelectorErrorServicesForTopic(topicServices);
    }
    if (isLoadingServicesForTopic(topicServices)) {
        return toSelectorLoadingServicesForTopic();
    }
    return buildInitialEmptyServicesForTopic();
};

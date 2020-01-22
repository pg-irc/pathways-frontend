import { SelectorTopicServices, SelectorErrorServicesForTopic } from './types';
import * as constants from '../../application/constants';

export const isSelectorErrorServicesForTopic = (topicServicesOrError: SelectorTopicServices):
    topicServicesOrError is SelectorErrorServicesForTopic => (
        (<SelectorErrorServicesForTopic>topicServicesOrError).type === constants.TOPIC_SERVICES_ERROR
    );

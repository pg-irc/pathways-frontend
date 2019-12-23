import { SelectorTopicServices, ErrorSelectorTopicServices } from './types';
import * as constants from '../../application/constants';

export const isErrorSelectorTopicServices = (topicServicesOrError: SelectorTopicServices):
    topicServicesOrError is ErrorSelectorTopicServices => (
        (<ErrorSelectorTopicServices>topicServicesOrError).type === constants.TOPIC_SERVICES_ERROR
    );

import { ErrorServicesForTopic } from '../../stores/services/types';
import { ErrorSelectorTopicServices } from './types';
import * as constants from '../../application/constants';

export const toErrorSelectorTopicServices = (topicServicesError: ErrorServicesForTopic):
    ErrorSelectorTopicServices => ({
        errorMessageType: topicServicesError.errorMessageType,
        type: constants.TOPIC_SERVICES_ERROR,
    });
import { ErrorServicesForTopic } from '../../validation/services/types';
import { SelectorErrorServicesForTopic } from './types';
import * as constants from '../../application/constants';

export const toSelectorErrorServicesForTopic = (topicServicesError: ErrorServicesForTopic):
    SelectorErrorServicesForTopic => ({
        errorMessageType: topicServicesError.errorMessageType,
        type: constants.ERROR_SERVICES_FOR_TOPIC,
    });
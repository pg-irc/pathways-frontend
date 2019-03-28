import { ErrorTaskServices } from '../../stores/services';
import { ErrorSelectorTopicServices } from './types';
import * as constants from '../../application/constants';

export const toErrorSelectorTaskServices = (taskServicesError: ErrorTaskServices):
    ErrorSelectorTopicServices => ({
        errorMessageType: taskServicesError.errorMessageType,
        type: constants.TOPIC_SERVICES_ERROR,
    });
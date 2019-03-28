import { ErrorTaskServices } from '../../stores/services';
import { ErrorSelectorTaskServices } from './types';
import * as constants from '../../application/constants';

export const toErrorSelectorTaskServices = (taskServicesError: ErrorTaskServices):
    ErrorSelectorTaskServices => ({
        errorMessageType: taskServicesError.errorMessageType,
        type: constants.TOPIC_SERVICES_ERROR,
    });
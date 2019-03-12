import { ErrorTaskServices } from '../../stores/services';
import { ErrorSelectorTaskServices } from './types';
import * as constants from '../../application/constants';

export const toErrorSelectorTaskServices = (taskServicesError: ErrorTaskServices):
    ErrorSelectorTaskServices => ({
        errorMessageType: taskServicesError.errorMessageType,
        type: constants.TASK_SERVICES_ERROR,
    });
import { TaskServicesError } from '../../stores/services';
import { SelectorTaskServicesError } from './types';
import * as constants from '../../application/constants';

export const toSelectorTaskServicesError = (taskServicesError: TaskServicesError):
    SelectorTaskServicesError => ({
        errorMessageType: taskServicesError.errorMessageType,
        type: constants.TASK_SERVICES_ERROR,
    });
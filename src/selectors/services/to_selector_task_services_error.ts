import { TaskServicesError } from '../../stores/services';
import { SelectorTaskServicesError } from './types';

export const toSelectorTaskServicesError = (taskServicesError: TaskServicesError):
    SelectorTaskServicesError => ({
        loading: false, // TODO remove
        errorMessageType: taskServicesError.errorMessageType,
    });
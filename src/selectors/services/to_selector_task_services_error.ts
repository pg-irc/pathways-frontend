import { TaskServicesError } from '../../stores/services';
import { SelectorTaskServicesError } from './selector_task_services_error';

export const toSelectorTaskServicesError = (taskServicesError: TaskServicesError):
    SelectorTaskServicesError => ({
        loading: taskServicesError.loading,
        errorMessageType: taskServicesError.errorMessageType,
    });
import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/tasks';
import { isTaskServices, isTaskServicesError, buildEmptyTasksServices } from '../../stores/services';
import { SelectorTaskServices } from './types';
import { toValidSelectorTaskServices } from './to_valid_selector_task_services';
import { toErrorSelectorTaskServices } from './to_error_selector_task_services';
import * as constants from '../../application/constants';

export const selectTaskServices = (taskId: TaskId, store: Store): SelectorTaskServices => {
    const taskServicesOrError = store.servicesInStore.taskServicesOrError[taskId] || buildEmptyTasksServices();
    if (isTaskServices(taskServicesOrError)) {
        return toValidSelectorTaskServices(taskServicesOrError, store.servicesInStore.services);
    }
    if (isTaskServicesError(taskServicesOrError)) {
        return toErrorSelectorTaskServices(taskServicesOrError);
    }
    return { type: constants.TASK_SERVICES_LOADING };
};

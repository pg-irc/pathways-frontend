import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/topics';
import { isValidTaskServices, isTaskServicesError, buildEmptyTasksServices } from '../../stores/services';
import { SelectorTaskServices } from './types';
import { toValidSelectorTaskServices } from './to_valid_selector_task_services';
import { toErrorSelectorTaskServices } from './to_error_selector_task_services';
import * as constants from '../../application/constants';

export const selectTaskServices = (taskId: TaskId, store: Store): SelectorTaskServices => {
    const taskServices = store.servicesInStore.taskServicesOrError[taskId] || buildEmptyTasksServices();
    if (isValidTaskServices(taskServices)) {
        return toValidSelectorTaskServices(taskServices, store.servicesInStore.services);
    }
    if (isTaskServicesError(taskServices)) {
        return toErrorSelectorTaskServices(taskServices);
    }
    return { type: constants.TOPIC_SERVICES_LOADING };
};

import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/tasks';
import { isTaskServices, isTaskServicesError, buildEmptyTasksServices } from '../../stores/services';
import { SelectorTaskServicesOrError } from './types';
import { toSelectorTaskServices } from './to_selector_task_services';
import { toSelectorTaskServicesError } from './to_selector_task_services_error';
import * as constants from '../../application/constants';

export const selectTaskServicesOrError = (taskId: TaskId, store: Store): SelectorTaskServicesOrError => {
    const taskServicesOrError = store.servicesInStore.taskServicesOrError[taskId] || buildEmptyTasksServices();
    if (isTaskServices(taskServicesOrError)) {
        return toSelectorTaskServices(taskServicesOrError, store.servicesInStore.services);
    }
    if (isTaskServicesError(taskServicesOrError)) {
        return toSelectorTaskServicesError(taskServicesOrError);
    }
    return { loading: true, type: constants.TASK_SERVICES_LOADING };
};

import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/tasks';
import { isTaskServices } from '../../stores/services';
import { SelectorTaskServices } from './selector_task_services';
import { SelectorTaskServicesError } from './selector_task_services_error';
import { toSelectorTaskServices } from './to_selector_task_services';
import { toSelectorTaskServicesError } from './to_selector_task_services_error';

export function selectTaskServicesOrError(taskId: TaskId, store: Store): SelectorTaskServices | SelectorTaskServicesError {
    const taskServicesOrError = store.servicesInStore.taskServicesOrError[taskId];
    if (isTaskServices(taskServicesOrError)) {
        return toSelectorTaskServices(taskServicesOrError, store.servicesInStore.services);
    }
    return toSelectorTaskServicesError(taskServicesOrError);
}

import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/tasks';
import { TaskServicesError } from '../../stores/services';

export const selectTaskServicesError = (taskId: TaskId, store: Store): TaskServicesError => (
    store.servicesInStore.taskServicesErrors[taskId]
);
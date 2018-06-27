import { Id as TaskId } from '../stores/tasks';
import { Id as ServiceId, buildDefaultTaskServices } from '../stores/services';
import { Task } from '../selectors/tasks';
import { Service, Store } from '../stores/services';
import { take } from 'ramda';

export interface TaskServices {
    readonly loading: boolean;
    readonly message: string;
    readonly services: ReadonlyArray<Service>;
}

export function selectTaskServices(taskId: TaskId, store: Store): TaskServices {
    const taskServices = store.taskServicesMap[taskId] || buildDefaultTaskServices();
    return {
        loading: taskServices.loading,
        message: taskServices.message,
        services: taskServices.serviceIds.map((serviceId: ServiceId) => {
            return store.serviceMap[serviceId];
        }),
    };
}

export function createRelatedServicesQueryFromTask(task: Task): string {
    return take(3, task.title.split(' ')).join(',');
}
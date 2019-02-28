import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/tasks';
import { Id as ServiceId, buildDefaultTaskServices } from '../../stores/services';
import { TaskServices } from './task_services';

export function selectTaskServices(taskId: TaskId, store: Store): TaskServices {
    const servicesStore = store.servicesInStore;
    const taskServices = servicesStore.taskServicesMap[taskId] || buildDefaultTaskServices();
    return {
        loading: taskServices.loading,
        services: taskServices.serviceIds.map((serviceId: ServiceId) => servicesStore.serviceMap[serviceId]),
    };
}

import { TaskServices, ServiceMap, Id as ServiceId } from '../../stores/services';
import { SelectorTaskServices } from './selector_task_services';

export const toSelectorTaskServices = (taskServices: TaskServices, services: ServiceMap):
    SelectorTaskServices => ({
        loading: taskServices.loading,
        services: taskServices.serviceIds.map((serviceId: ServiceId) => services[serviceId]),
    });
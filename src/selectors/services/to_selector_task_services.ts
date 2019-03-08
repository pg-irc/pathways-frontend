import { TaskServices, ServiceMap, Id as ServiceId } from '../../stores/services';
import { SelectorTaskServices } from './types';

export const toSelectorTaskServices = (taskServices: TaskServices, services: ServiceMap):
    SelectorTaskServices => ({
        loading: false, // TODO remove
        services: taskServices.serviceIds.map((serviceId: ServiceId) => services[serviceId]),
    });
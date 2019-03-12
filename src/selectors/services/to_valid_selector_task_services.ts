import { TaskServices, ServiceMap, Id as ServiceId } from '../../stores/services';
import { ValidSelectorTaskServices } from './types';
import * as constants from '../../application/constants';

export const toValidSelectorTaskServices = (taskServices: TaskServices, services: ServiceMap):
    ValidSelectorTaskServices => ({
        services: taskServices.serviceIds.map((serviceId: ServiceId) => services[serviceId]),
        type: constants.TASK_SERVICES_VALID,
    });

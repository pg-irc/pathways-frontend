import { ValidTaskServices, ServiceMap, Id as ServiceId } from '../../stores/services';
import { ValidSelectorTaskServices } from './types';
import * as constants from '../../application/constants';

export const toValidSelectorTaskServices = (taskServices: ValidTaskServices, services: ServiceMap):
    ValidSelectorTaskServices => ({
        services: taskServices.serviceIds.map((serviceId: ServiceId) => services[serviceId]),
        type: constants.TASK_SERVICES_VALID,
    });

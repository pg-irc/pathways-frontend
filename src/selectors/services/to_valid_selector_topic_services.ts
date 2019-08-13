import { ValidServicesForTopic, ServiceMap, Id as ServiceId } from '../../stores/services';
import { ValidSelectorTopicServices } from './types';
import * as constants from '../../application/constants';

export const toValidSelectorTopicServices = (taskServices: ValidServicesForTopic, services: ServiceMap):
    ValidSelectorTopicServices => ({
        services: taskServices.serviceIds.map((serviceId: ServiceId) => services[serviceId]),
        type: constants.TOPIC_SERVICES_VALID,
    });

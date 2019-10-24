import { ValidServicesForTopic, ServiceMap, Id as ServiceId } from '../../validation/services/types';
import { ValidSelectorTopicServices } from './types';
import * as constants from '../../application/constants';

export const toValidSelectorTopicServices = (topicServices: ValidServicesForTopic, services: ServiceMap):
    ValidSelectorTopicServices => ({
        services: topicServices.serviceIds.map((serviceId: ServiceId) => services[serviceId]),
        type: constants.TOPIC_SERVICES_VALID,
    });

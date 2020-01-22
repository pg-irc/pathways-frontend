import { ValidServicesForTopic, ServiceMap, Id as ServiceId } from '../../validation/services/types';
import { SelectorValidServicesForTopic } from './types';
import * as constants from '../../application/constants';

export const toSelectorValidServicesForTopic = (topicServices: ValidServicesForTopic, services: ServiceMap):
    SelectorValidServicesForTopic => ({
        services: topicServices.serviceIds.map((serviceId: ServiceId) => services[serviceId]),
        type: constants.TOPIC_SERVICES_VALID,
        isExpired: topicServices.expiresAt < Date.now(),
    });

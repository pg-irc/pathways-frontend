import { ValidServicesForTopic, ServicesForTopic } from '../../validation/services/types';
import * as constants from '../../application/constants';

export const isValidServicesForTopic = (services: ServicesForTopic):
    services is ValidServicesForTopic => (
        services.type === constants.TOPIC_SERVICES_VALID
    );

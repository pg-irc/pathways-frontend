import { ErrorServicesForTopic, ServicesForTopic } from '../../validation/services/types';
import * as constants from '../../application/constants';

export const isErrorServicesForTopic = (services: ServicesForTopic):
    services is ErrorServicesForTopic => (
        services.type === constants.ERROR_SERVICES_FOR_TOPIC
    );

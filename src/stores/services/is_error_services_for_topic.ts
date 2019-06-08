import { ErrorServicesForTopic, ServicesForTopic } from '.';
import * as constants from '../../application/constants';

export const isErrorServicesForTopic = (services: ServicesForTopic):
    services is ErrorServicesForTopic => (
        services.type === constants.TOPIC_SERVICES_ERROR
    );

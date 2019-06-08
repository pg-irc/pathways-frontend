import { ValidServicesForTopic, ServicesForTopic } from '.';
import * as constants from '../../application/constants';

export const isValidServicesForTopic = (services: ServicesForTopic):
    services is ValidServicesForTopic => (
        services.type === constants.TOPIC_SERVICES_VALID
    );

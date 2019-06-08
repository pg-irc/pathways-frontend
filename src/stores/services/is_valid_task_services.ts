import { ValidServicesForTopic, ServicesForTopic } from '.';
import * as constants from '../../application/constants';

export const isValidTaskServices = (taskServices: ServicesForTopic):
    taskServices is ValidServicesForTopic => (
        taskServices.type === constants.TOPIC_SERVICES_VALID
    );

import { ErrorServicesForTopic, ServicesForTopic } from '.';
import * as constants from '../../application/constants';

export const isErrorTaskServices = (taskServices: ServicesForTopic):
    taskServices is ErrorServicesForTopic => (
        taskServices.type === constants.TOPIC_SERVICES_ERROR
    );

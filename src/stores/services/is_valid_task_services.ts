import { ValidTaskServices, TopicServices } from '.';
import * as constants from '../../application/constants';

export const isValidTaskServices = (taskServices: TopicServices):
    taskServices is ValidTaskServices => (
        taskServices.type === constants.TOPIC_SERVICES_VALID
    );

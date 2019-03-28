import { ErrorTaskServices, TopicServices } from '.';
import * as constants from '../../application/constants';

export const isErrorTaskServices = (taskServices: TopicServices):
    taskServices is ErrorTaskServices => (
        taskServices.type === constants.TOPIC_SERVICES_ERROR
    );

import { ValidTaskServices, TaskServices } from '.';
import * as constants from '../../application/constants';

export const isValidTaskServices = (taskServices: TaskServices):
    taskServices is ValidTaskServices => (
        taskServices.type === constants.TASK_SERVICES_VALID
    );

import { ErrorTaskServices, TaskServices } from '.';
import * as constants from '../../application/constants';

export const isTaskServicesError = (taskServices: TaskServices):
    taskServices is ErrorTaskServices => (
        taskServices.type === constants.TASK_SERVICES_ERROR
    );

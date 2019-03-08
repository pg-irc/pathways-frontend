import { TaskServices, TaskServicesOrError } from '.';
import * as constants from '../../application/constants';

export const isTaskServices = (taskServicesOrError: TaskServicesOrError):
    taskServicesOrError is TaskServices => (
        taskServicesOrError.type === constants.TASK_SERVICES_VALID
    );

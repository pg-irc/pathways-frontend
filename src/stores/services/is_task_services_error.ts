import { TaskServicesError, TaskServicesOrError } from '.';
import * as constants from '../../application/constants';

export const isTaskServicesError = (taskServicesOrError: TaskServicesOrError):
    taskServicesOrError is TaskServicesError => (
        taskServicesOrError.type === constants.TASK_SERVICES_ERROR
    );

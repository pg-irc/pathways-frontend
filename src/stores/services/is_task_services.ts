import { TaskServices, TaskServicesError } from '.';

export const isTaskServices = (taskServicesOrError: TaskServices | TaskServicesError):
    taskServicesOrError is TaskServices => (
        (<TaskServices>taskServicesOrError).serviceIds !== undefined
    );

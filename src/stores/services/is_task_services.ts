import { TaskServices, TaskServicesError } from '.';

export const isTaskServices = (taskServices: TaskServices | TaskServicesError):
    taskServices is TaskServices => (
        (<TaskServices>taskServices).serviceIds !== undefined
    );

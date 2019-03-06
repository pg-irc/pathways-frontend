import { TaskServices, TaskServicesError } from '.';

export const isTaskServicesError = (taskServicesOrError: TaskServices | TaskServicesError):
    taskServicesOrError is TaskServicesError => (
        (<TaskServicesError>taskServicesOrError).errorMessage !== undefined
    );

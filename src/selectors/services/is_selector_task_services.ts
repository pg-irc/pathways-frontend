import { SelectorTaskServices } from './selector_task_services';
import { SelectorTaskServicesError } from './selector_task_services_error';

export const isSelectorTaskServices = (taskServicesOrError: SelectorTaskServices | SelectorTaskServicesError):
    taskServicesOrError is SelectorTaskServices => (
        (<SelectorTaskServices>taskServicesOrError).services !== undefined
    );

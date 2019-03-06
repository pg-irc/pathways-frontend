import { SelectorTaskServices } from './selector_task_services';
import { SelectorTaskServicesError } from './selector_task_services_error';

export const isSelectorTaskServices = (taskServices: SelectorTaskServices | SelectorTaskServicesError):
    taskServices is SelectorTaskServices => (
        (<SelectorTaskServices>taskServices).services !== undefined
    );

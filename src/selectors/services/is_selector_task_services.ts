import { SelectorTaskServices, SelectorTaskServicesOrError } from './types';

export const isSelectorTaskServices = (taskServicesOrError: SelectorTaskServicesOrError):
    taskServicesOrError is SelectorTaskServices => (
        (<SelectorTaskServices>taskServicesOrError).services !== undefined
    );

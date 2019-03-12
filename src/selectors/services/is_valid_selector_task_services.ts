import { ValidSelectorTaskServices, SelectorTaskServices } from './types';

export const isValidSelectorTaskServices = (taskServicesOrError: SelectorTaskServices):
    taskServicesOrError is ValidSelectorTaskServices => (
        (<ValidSelectorTaskServices>taskServicesOrError).services !== undefined
    );

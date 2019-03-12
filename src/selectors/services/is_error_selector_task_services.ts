import { SelectorTaskServices, ErrorSelectorTaskServices } from './types';

export const isErrorSelectorTaskServices = (taskServicesOrError: SelectorTaskServices):
    taskServicesOrError is ErrorSelectorTaskServices => (
        (<ErrorSelectorTaskServices>taskServicesOrError).errorMessageType !== undefined
    );

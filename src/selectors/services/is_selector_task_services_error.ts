import { SelectorTaskServicesOrError, SelectorTaskServicesError } from './types';

export const isSelectorTaskServicesError = (taskServicesOrError: SelectorTaskServicesOrError):
    taskServicesOrError is SelectorTaskServicesError => (
        (<SelectorTaskServicesError>taskServicesOrError).errorMessageType !== undefined
    );

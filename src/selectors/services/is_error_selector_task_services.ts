import { SelectorTopicServices, ErrorSelectorTopicServices } from './types';

export const isErrorSelectorTaskServices = (taskServicesOrError: SelectorTopicServices):
    taskServicesOrError is ErrorSelectorTopicServices => (
        (<ErrorSelectorTopicServices>taskServicesOrError).errorMessageType !== undefined
    );

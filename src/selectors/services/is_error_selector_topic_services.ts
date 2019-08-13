import { SelectorTopicServices, ErrorSelectorTopicServices } from './types';

export const isErrorSelectorTopicServices = (taskServicesOrError: SelectorTopicServices):
    taskServicesOrError is ErrorSelectorTopicServices => (
        (<ErrorSelectorTopicServices>taskServicesOrError).errorMessageType !== undefined
    );

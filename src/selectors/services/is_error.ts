import { SelectorTopicServices, ErrorSelectorTopicServices } from './types';

export const isError = (taskServicesOrError: SelectorTopicServices):
    taskServicesOrError is ErrorSelectorTopicServices => (
        (<ErrorSelectorTopicServices>taskServicesOrError).errorMessageType !== undefined
    );

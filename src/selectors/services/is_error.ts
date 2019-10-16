import { SelectorTopicServices, ErrorSelectorTopicServices } from './types';

export const isError = (topicServicesOrError: SelectorTopicServices):
    topicServicesOrError is ErrorSelectorTopicServices => (
        (<ErrorSelectorTopicServices>topicServicesOrError).errorMessageType !== undefined
    );

import { ValidSelectorTopicServices, SelectorTopicServices } from './types';

export const isValidSelectorTopicServices = (topicServices: SelectorTopicServices):
    topicServices is ValidSelectorTopicServices => (
        (<ValidSelectorTopicServices>topicServices).services !== undefined
    );

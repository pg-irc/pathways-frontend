import { SelectorValidServicesForTopic, SelectorTopicServices } from './types';

export const isSelectorValidServicesForTopic = (topicServices: SelectorTopicServices):
    topicServices is SelectorValidServicesForTopic => (
        (<SelectorValidServicesForTopic>topicServices).services !== undefined
    );

import { toValidOrThrow, TopicMap } from '../../stores/topics';
import { Store } from '../../stores';

export const pickTopics = (appStore: Store): TopicMap => (
    toValidOrThrow(appStore.topics).topicMap
);

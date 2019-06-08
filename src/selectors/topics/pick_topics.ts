import { Store } from '../../stores';
import { TopicMap, toValidOrThrow } from '../../stores/topics';

export const pickTopics = (appStore: Store): TopicMap => (
    toValidOrThrow(appStore.topicsInStore).topicMap
);

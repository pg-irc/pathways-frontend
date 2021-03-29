import { Store } from '../../stores';
import { TopicMap, toValidOrThrow } from '../../stores/topics';

export const selectTopicsForCurrentRegion = (appStore: Store): TopicMap => (
    toValidOrThrow(appStore.topics).topicMap
);

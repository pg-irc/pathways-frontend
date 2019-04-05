import { Store } from '../../stores';
import { TopicMap, toValidOrThrow } from '../../stores/topics';

export const pickTasks = (appStore: Store): TopicMap => (
    toValidOrThrow(appStore.tasksInStore).topicMap
);

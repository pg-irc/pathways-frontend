import { Store } from '../../stores';
import { Id, toValidOrThrow } from '../../stores/topics';

export const pickBookmarkedTopicIds = (appStore: Store): ReadonlyArray<Id> => (
    toValidOrThrow(appStore.topics).bookmarkedTopics
);

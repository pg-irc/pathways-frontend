import { Store } from '../../stores';
import { Id, toValidOrThrow } from '../../stores/topics';

export const pickSavedTopicIds = (appStore: Store): ReadonlyArray<Id> => (
    toValidOrThrow(appStore.topicsInStore).savedTopicsList
);

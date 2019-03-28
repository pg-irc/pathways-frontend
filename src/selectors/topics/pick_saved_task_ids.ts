import { Store } from '../../stores';
import { Id, toValidOrThrow } from '../../stores/topics';

export const pickSavedTaskIds = (appStore: Store): ReadonlyArray<Id> => (
    toValidOrThrow(appStore.tasksInStore).savedTopicsList
);

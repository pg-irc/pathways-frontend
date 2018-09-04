import { Store } from '../../stores';
import { Id, toValidOrThrow } from '../../stores/tasks';

export const pickSavedTaskIds = (appStore: Store): ReadonlyArray<Id> => (
    toValidOrThrow(appStore.tasksInStore).savedTasksList
);

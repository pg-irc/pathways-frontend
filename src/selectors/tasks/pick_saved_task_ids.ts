import { Store } from '../../stores';
import * as store from '../../stores/tasks';

export const pickSavedTaskIds = (appStore: Store): ReadonlyArray<store.Id> => (
    appStore.tasksInStore.savedTasksList
);

import { Store } from '../../stores';
import { TaskMap, toValidOrThrow } from '../../stores/tasks';

export const pickTasks = (appStore: Store): TaskMap => (
    toValidOrThrow(appStore.tasksInStore).taskMap
);

import { Store } from '../../stores';
import { TaskMap } from '../../stores/tasks';

export const pickTasks = (appStore: Store): TaskMap => (
    appStore.tasksInStore.taskMap
);
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { TaskListItem } from './task_list_item';
import { selectTaskAsListItem } from './select_task_as_list_item';

export const selectSavedTasks = (appStore: Store): ReadonlyArray<TaskListItem> => {
    const savedTasksList = appStore.tasksInStore.savedTasksList;
    return savedTasksList.map((taskId: store.Id) => {
        return selectTaskAsListItem(appStore, taskId);
    });
};

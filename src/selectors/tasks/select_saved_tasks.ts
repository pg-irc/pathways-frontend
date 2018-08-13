import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { TaskListItem } from './task_list_item';
import { selectTaskAsListItem } from '.';

export const selectSavedTasks = (appStore: Store): ReadonlyArray<TaskListItem> => {
    const savedTasksList = appStore.tasksInStore.savedTasksList;
    return savedTasksList.map((taskId: store.Id) => {
        return selectTaskAsListItem(appStore, taskId);
    });
};

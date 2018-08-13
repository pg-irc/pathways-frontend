import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { TaskListItem } from './task_list_item';
import { selectTaskAsListItem } from './select_task_as_list_item';

export const selectRelatedTasks = (appStore: Store, taskIds: ReadonlyArray<store.Id>): ReadonlyArray<TaskListItem> => (
    R.map((taskId: store.Id) => selectTaskAsListItem(appStore, taskId), taskIds)
);

export const rejectTasksWithIdsInList =
    R.curry((listOfIds: store.TaskList, tasks: ReadonlyArray<store.Task>): ReadonlyArray<store.Task> => {
        const idIsInList = (task: store.Task): boolean => (
            R.contains(task.id, listOfIds)
        );
        return R.reject(idIsInList, tasks);
    });

export const rejectCompletedTasks = R.reject(R.prop('completed'));

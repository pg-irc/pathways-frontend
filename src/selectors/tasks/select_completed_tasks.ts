import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { TaskListItem } from './task_list_item';
import { selectTaskAsListItem } from './select_task_as_list_item';
import { pickTasks } from './pick_tasks';

export const selectCompletedTasks = (appStore: Store): ReadonlyArray<TaskListItem> => {
    const tasks = pickTasks(appStore);
    const taskIds = R.keys(R.pickBy(R.prop('completed'), tasks));
    return R.map((taskId: store.Id) => selectTaskAsListItem(appStore, taskId), taskIds);
};

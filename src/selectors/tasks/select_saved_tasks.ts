import * as R from 'ramda';
import { Store } from '../../stores';
import { TaskListItem } from './task_list_item';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickSavedTaskIds } from './pick_saved_task_ids';

export const selectSavedTasks = (appStore: Store): ReadonlyArray<TaskListItem> => (
    R.map(buildSelectorTaskListItem(appStore), pickSavedTaskIds(appStore))
);

import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { TaskListItem } from './task_list_item';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';

export const selectRelatedTasks = (appStore: Store, taskIds: ReadonlyArray<store.Id>): ReadonlyArray<TaskListItem> => (
    R.map(buildSelectorTaskListItem(appStore), taskIds)
);

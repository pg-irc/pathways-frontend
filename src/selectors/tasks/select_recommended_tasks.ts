import * as R from 'ramda';
import { Store } from '../../stores';
import { Task } from './task';
import { buildSelectorTask } from './build_selector_task';
import { getRecommendedTasks } from './get_recommended_tasks';

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => (
    R.map(buildSelectorTask(appStore), getRecommendedTasks(appStore))
);

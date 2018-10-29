import { TaskMap, Id } from '../../stores/tasks';
import { getIdsFromTaskMap } from './get_ids_from_task_map';
import { filterCompletedTasks } from './filter_completed_tasks';

export const getIdsOfCompletedTasks = (tasks: TaskMap): ReadonlyArray<Id> => (
    getIdsFromTaskMap(filterCompletedTasks(tasks))
);

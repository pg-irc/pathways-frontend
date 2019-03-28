import * as R from 'ramda';
import { Task } from '../../stores/topics';
import { Id } from '../../fixtures/types/explore';

export const rejectTasksWithIds = (tasks: ReadonlyArray<Task>, taskIds: ReadonlyArray<Id>): ReadonlyArray<Task> => {
    const taskIsBlacklisted = (task: Task): boolean => R.contains(task.id, taskIds);
    return R.reject(taskIsBlacklisted, tasks);
};

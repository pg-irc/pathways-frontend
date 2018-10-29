import { TaskMap, Id } from '../../stores/tasks';
import { isCompleted } from './is_completed';
import { getId } from './get_id';
import * as R from 'ramda';

export const getIdsOfCompletedTasks = (tasks: TaskMap): ReadonlyArray<Id> => (
    R.map(getId, R.filter(isCompleted, R.values(tasks)))
);

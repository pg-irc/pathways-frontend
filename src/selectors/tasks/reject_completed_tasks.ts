import * as R from 'ramda';
import { Task } from '../../stores/tasks';

export const rejectCompletedTasks = (tasks: ReadonlyArray<Task>): ReadonlyArray<Task> => (
    R.reject(R.prop('completed'), tasks)
);

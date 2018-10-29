import { TaskMap } from '../../stores/tasks';
import * as R from 'ramda';

export const filterCompletedTasks = (tasks: TaskMap): TaskMap => (
    R.filter(R.propEq('completed', true), tasks)
);

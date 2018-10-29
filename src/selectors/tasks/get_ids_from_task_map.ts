import { TaskMap, Id, Task } from '../../stores/tasks';
import * as R from 'ramda';

export const getIdsFromTaskMap = (tasks: TaskMap): ReadonlyArray<Id> => (
    R.map((task: Task) => task.id, R.values(tasks))
);

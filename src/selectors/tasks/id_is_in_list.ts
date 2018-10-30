import { TaskList, Task } from '../../stores/tasks';
import * as R from 'ramda';

export const idIsInList = R.curry((taskIds: TaskList, task: Task): boolean => (
    R.contains(task.id, taskIds)
));

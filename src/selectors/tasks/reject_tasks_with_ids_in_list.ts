import * as R from 'ramda';
import { Task, TaskList } from '../../stores/tasks';

export const rejectTasksWithIdsInList =
    R.curry((listOfIds: TaskList, tasks: ReadonlyArray<Task>): ReadonlyArray<Task> => {
        const idIsInList = (task: Task): boolean => (
            R.contains(task.id, listOfIds)
        );
        return R.reject(idIsInList, tasks);
    });

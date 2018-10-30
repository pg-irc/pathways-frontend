import { Id, Task } from '../../stores/tasks';
import { isCompleted } from './is_completed';
import { idIsInList } from './id_is_in_list';
import * as R from 'ramda';

export const rejectSavedAndCompletedTasks = (savedTaskIds: ReadonlyArray<Id>, tasks: ReadonlyArray<Task>): ReadonlyArray<Task> => (
    R.reject(isCompleted, R.reject(idIsInList(savedTaskIds), tasks))
);

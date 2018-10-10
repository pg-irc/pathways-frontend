import { Id, Task } from '../../stores/tasks';
import { rejectCompletedTasks } from './reject_completed_tasks';
import { rejectTasksWithIdsInList } from './reject_tasks_with_ids_in_list';

export const rejectSavedAndCompletedTasks = (savedTaskIds: ReadonlyArray<Id>, tasks: ReadonlyArray<Task>): ReadonlyArray<Task> => (
    rejectCompletedTasks(rejectTasksWithIdsInList(savedTaskIds, tasks))
);

import { Task } from '../selectors/tasks';

export function createRelatedServicesQueryFromTask(task: Task): string {
    return task.title.replace(' ', ',');
}
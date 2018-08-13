import { Task } from '../tasks/task';
import * as R from 'ramda';

export function createRelatedServicesQueryFromTask(task: Task): string {
    return R.take(3, task.title.split(' ')).join(',');
}
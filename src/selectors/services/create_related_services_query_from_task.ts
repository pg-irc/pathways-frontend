import { Task } from '../../stores/tasks';
import R from 'ramda';

export const createRelatedServicesQueryFromTask = (task: Task): string => (
    task.serviceQuery !== '' ? task.serviceQuery : firstThreeWordsFromTitleInEnglish(task)
);

const firstThreeWordsFromTitleInEnglish = (task: Task): string => (
    // tslint:disable-next-line:no-string-literal
    R.take(3, task.title['en'].split(' ')).join(',')
);

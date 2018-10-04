import { Task } from './task';
import * as R from 'ramda';

export const sortTaskList = (taskList: ReadonlyArray<Task>): ReadonlyArray<Task> => {
    const compare = (a: Task, b: Task): number => (
        a.isRecommended === b.isRecommended ?
            a.id.localeCompare(b.id) :
            a.isRecommended ? -1 : 1
    );
    return R.sort(compare, taskList);
};

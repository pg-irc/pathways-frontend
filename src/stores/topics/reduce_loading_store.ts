import { TaskStore, ValidTaskStore, LoadingTaskStore, InvalidTaskStore } from './stores';
import * as UserStateActions from '../../application/constants';
import { TaskAction } from './actions';
import { TaskMap, Id, Task } from '../../fixtures/types/tasks';
import * as R from 'ramda';

export const reduceLoadingStore = (store: LoadingTaskStore, action: TaskAction): TaskStore => {
    switch (action.type) {
        case UserStateActions.LOAD_USER_DATA_SUCCESS:
            return new ValidTaskStore({
                taskMap: R.map(setCompleted(action.payload.completedTasks), store.lastValidState.taskMap),
                savedTasksList: filterValidIds(store.lastValidState.taskMap, action.payload.savedTasks),
            });
        case UserStateActions.LOAD_USER_DATA_FAILURE:
            return new InvalidTaskStore(store.lastValidState, action.payload.message);
        default:
            return store;
    }
};

const filterValidIds = (tasks: TaskMap, ids: ReadonlyArray<Id>): ReadonlyArray<Id> => (
    R.filter((id: string): boolean => R.has(id, tasks), ids)
);

const setCompleted = R.curry((completedTaskIds: ReadonlyArray<Id>, task: Task): Task => ({
    ...task,
    completed: R.contains(task.id, completedTaskIds),
}));

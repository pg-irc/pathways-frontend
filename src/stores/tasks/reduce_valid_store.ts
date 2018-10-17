import { TaskStore, ValidTaskStore, LoadingTaskStore, toValidOrThrow } from './stores';
import { Id, TaskList } from '../../fixtures/types/tasks';
import * as constants from '../../application/constants';
import { TaskAction, addToSavedList } from './actions';
import * as R from 'ramda';

export const reduceValidStore = (store: ValidTaskStore, action: TaskAction): TaskStore => {
    switch (action.type) {
        case constants.ADD_TO_SAVED_TASKS:
            return addToTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.REMOVE_FROM_SAVED_TASKS:
            return removeFromTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.SAVE_THESE_TASKS_TO_MY_PLAN:
            return R.reduce(
                (theStore: ValidTaskStore, taskId: Id): ValidTaskStore => (
                    toValidOrThrow(reduceValidStore(theStore, addToSavedList(taskId)))
                ),
                store,
                action.payload.taskIds,
            );
        case constants.TOGGLE_IS_TASK_COMPLETED:
            return toggleCompletedValue(store, action.payload.taskId);
        case constants.LOAD_USER_DATA_REQUEST:
            return new LoadingTaskStore(store);
        default:
            return store;
    }
};

const addToTaskList = (store: ValidTaskStore, property: keyof (ValidTaskStore), taskList: TaskList, value: Id): ValidTaskStore => {
    if (taskList.indexOf(value) !== -1) {
        return store;
    }
    return new ValidTaskStore({ ...store, [property]: [...taskList, value] });
};

const removeFromTaskList = (store: ValidTaskStore, property: keyof (ValidTaskStore), taskList: TaskList, value: Id): ValidTaskStore => {
    if (taskList.indexOf(value) === -1) {
        return store;
    }
    return new ValidTaskStore({ ...store, [property]: taskList.filter((id: Id) => id !== value) });
};

const toggleCompletedValue = (store: ValidTaskStore, taskId: Id): ValidTaskStore => {
    const task = store.taskMap[taskId];
    return new ValidTaskStore({
        ...store,
        taskMap: {
            ...store.taskMap,
            [taskId]: {
                ...task,
                completed: !task.completed,
            },
        },
    });
};

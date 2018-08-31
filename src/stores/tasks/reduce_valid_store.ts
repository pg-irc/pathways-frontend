import { Store, ValidStore, LoadingStore } from './stores';
import { Id, TaskList } from '../../fixtures/types/tasks';
import * as constants from '../../application/constants';
import { TaskAction } from './actions';

export const reduceValidStore = (store: ValidStore, action: TaskAction): Store => {
    switch (action.type) {
        case constants.ADD_TO_SAVED_TASKS:
            return addToTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.REMOVE_FROM_SAVED_TASKS:
            return removeFromTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.TOGGLE_IS_TASK_COMPLETED:
            return toggleCompletedValue(store, action.payload.taskId);
        case constants.LOAD_USER_DATA_REQUEST:
            return new LoadingStore(store);
        default:
            return store;
    }
};

const addToTaskList = (store: ValidStore, property: keyof (ValidStore), taskList: TaskList, value: Id): ValidStore => {
    if (taskList.indexOf(value) !== -1) {
        return store;
    }
    return new ValidStore({ ...store, [property]: [...taskList, value] });
};

const removeFromTaskList = (store: ValidStore, property: keyof (ValidStore), taskList: TaskList, value: Id): ValidStore => {
    if (taskList.indexOf(value) === -1) {
        return store;
    }
    return new ValidStore({ ...store, [property]: taskList.filter((id: Id) => id !== value) });
};

const toggleCompletedValue = (store: ValidStore, taskId: Id): ValidStore => {
    const task = store.taskMap[taskId];
    return new ValidStore({
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

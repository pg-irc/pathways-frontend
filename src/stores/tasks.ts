import { buildTasksFixture } from '../fixtures/buildFixtures';
import { Store, TaskList, Id } from '../fixtures/types/tasks';
import { Task as constants } from '../application/constants';
import * as helpers from './helpers/make_action';

export { Id, Task, TaskMap, TaskList, Store } from '../fixtures/types/tasks';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;
export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;
export type ToggleCompletedAction = Readonly<ReturnType<typeof toggleCompleted>>;
export type ShareAction = Readonly<ReturnType<typeof share>>;
type TaskAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ToggleCompletedAction |
    ShareAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (taskId: Id) => {
    const notificationText = 'Task added to my plan';
    return helpers.makeAction(constants.ADD_TO_SAVED_LIST, { taskId, notificationText });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (taskId: Id) => (
    helpers.makeAction(constants.REMOVE_FROM_SAVED_LIST, { taskId })
);

// tslint:disable-next-line:typedef
export const toggleCompleted = (taskId: Id) => (
    helpers.makeAction(constants.TOGGLE_COMPLETED, { taskId })
);

// tslint:disable-next-line:typedef
export const share = () => (
    helpers.makeAction(constants.SHARE)
);

export const buildDefaultStore = (): Store => (
    buildTasksFixture()
);

export const reducer = (store: Store = buildDefaultStore(), action?: TaskAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.ADD_TO_SAVED_LIST:
            return addToTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.REMOVE_FROM_SAVED_LIST:
            return removeFromTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.TOGGLE_COMPLETED:
            return toggleCompletedValue(store, action.payload.taskId);
        // TODO
        case constants.SHARE:
        default:
            return store;
    }
};

const addToTaskList = (store: Store, property: keyof (Store), taskList: TaskList, value: Id): Store => {
    if (taskList.indexOf(value) !== -1) {
        return store;
    }
    return { ...store, [property]: [...taskList, value] };
};

const removeFromTaskList = (store: Store, property: keyof (Store), taskList: TaskList, value: Id): Store => {
    if (taskList.indexOf(value) === -1) {
        return store;
    }
    return { ...store, [property]: taskList.filter((id: Id) => id !== value) };
};

const toggleCompletedValue = (store: Store, taskId: Id): Store => {
    const task = store.taskMap[taskId];
    return {
        ...store,
        taskMap: {
            ...store.taskMap,
            [taskId]: {
                ...task,
                completed: !task.completed,
            },
        },
    };
};

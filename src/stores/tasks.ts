import { buildTasksFixture } from '../fixtures/buildFixtures';
import { Store, TaskList, Id, TaskUserSettings, TaskUserSettingsMap } from '../fixtures/types/tasks';
import { Task as constants } from '../application/constants';
import * as helpers from './helpers/make_action';
import * as R from 'ramda';

export { Id, Task, TaskUserSettings, TaskMap, TaskUserSettingsMap, TaskList, Store } from '../fixtures/types/tasks';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;
export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;
export type ToggleCompletedAction = Readonly<ReturnType<typeof toggleCompleted>>;
export type ToggleStarredAction = Readonly<ReturnType<typeof toggleStarred>>;
export type ShareAction = Readonly<ReturnType<typeof share>>;
type TaskAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ToggleCompletedAction |
    ToggleStarredAction |
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
export const toggleStarred = (taskId: Id) => (
    helpers.makeAction(constants.TOGGLE_STARRED, { taskId })
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
            return toggleTaskUserSettingsCompletedValue(store, action.payload.taskId);
        case constants.TOGGLE_STARRED:
            return toggleTaskUserSettingsStarredValue(store, action.payload.taskId);
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

const toggleTaskUserSettingsCompletedValue = (store: Store, taskId: Id): Store => {
    const taskUserSettings = findTaskUserSettingsByTaskId(store.taskUserSettingsMap, taskId);
    return {
        ...store,
        taskUserSettingsMap: {
            ...store.taskUserSettingsMap,
            [taskUserSettings.id]: {
                ...taskUserSettings,
                completed: !taskUserSettings.completed,
            },
        },
    };
};

const toggleTaskUserSettingsStarredValue = (store: Store, taskId: Id): Store => {
    const taskUserSettings = findTaskUserSettingsByTaskId(store.taskUserSettingsMap, taskId);
    return {
        ...store,
        taskUserSettingsMap: {
            ...store.taskUserSettingsMap,
            [taskUserSettings.id]: {
                ...taskUserSettings,
                starred: !taskUserSettings.starred,
            },
        },
    };
};

export const findTaskUserSettingsByTaskId =
    (taskUserSettingsMap: TaskUserSettingsMap, taskId: Id): TaskUserSettings => {
        const validate = validateOneResultWasFound(taskId);
        const getUserTask = R.compose(validate, R.values, R.pickBy(R.propEq('taskId', taskId)));
        return getUserTask(taskUserSettingsMap);
    };

const validateOneResultWasFound =
    R.curry((taskId: string, userTasks: ReadonlyArray<TaskUserSettings>): TaskUserSettings => {
        if (userTasks.length !== 1) {
            throw new Error(`Could not find TaskUserSettings for task id: ${taskId}`);
        }
        return userTasks[0];
    });

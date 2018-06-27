import { buildTasksFixture } from '../fixtures/buildFixtures';
import { Store, TaskList, Id, TaskUserSettings } from '../fixtures/types/tasks';
import { Task as constants } from '../application/constants';
import * as helpers from './helpers/make_action';

export { Id, Task, TaskUserSettings, TaskMap, TaskUserSettingsMap, TaskList, Store } from '../fixtures/types/tasks';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;
export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;
export type AddToSuggestedListAction = Readonly<ReturnType<typeof addToSuggestedList>>;
export type RemoveFromSuggestedListAction = Readonly<ReturnType<typeof removeFromSuggestedList>>;
export type ToggleCompletedAction = Readonly<ReturnType<typeof toggleCompleted>>;
export type ToggleStarredAction = Readonly<ReturnType<typeof toggleStarred>>;
export type ShareAction = Readonly<ReturnType<typeof share>>;
type TaskAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    AddToSuggestedListAction |
    RemoveFromSuggestedListAction |
    ToggleCompletedAction |
    ToggleStarredAction |
    ShareAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (taskId: Id) => (
    helpers.makeAction(constants.ADD_TO_SAVED_LIST, { taskId })
);

// tslint:disable-next-line:typedef
export const removeFromSavedList = (taskId: Id) => (
    helpers.makeAction(constants.REMOVE_FROM_SAVED_LIST, { taskId })
);

// tslint:disable-next-line:typedef
export const addToSuggestedList = (taskId: Id) => (
    helpers.makeAction(constants.ADD_TO_SUGGESTED_LIST, { taskId })
);

// tslint:disable-next-line:typedef
export const removeFromSuggestedList = (taskId: Id) => (
    helpers.makeAction(constants.REMOVE_FROM_SUGGESTED_LIST, { taskId })
);

// tslint:disable-next-line:typedef
export const toggleCompleted = (taskUserSettingsId: Id) => (
    helpers.makeAction(constants.TOGGLE_COMPLETED, { taskUserSettingsId })
);

// tslint:disable-next-line:typedef
export const toggleStarred = (taskUserSettingsId: Id) => (
    helpers.makeAction(constants.TOGGLE_STARRED, { taskUserSettingsId })
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
        case constants.ADD_TO_SUGGESTED_LIST:
            return addToTaskList(store, 'suggestedTasksList', store.suggestedTasksList, action.payload.taskId);
        case constants.REMOVE_FROM_SUGGESTED_LIST:
            return removeFromTaskList(store, 'suggestedTasksList', store.suggestedTasksList, action.payload.taskId);
        case constants.TOGGLE_COMPLETED:
            return toggleTaskUserSettingsCompletedValue(store, action.payload.taskUserSettingsId);
        case constants.TOGGLE_STARRED:
            return toggleTaskUserSettingsStarredValue(store, action.payload.taskUserSettingsId);
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

const toggleTaskUserSettingsCompletedValue = (store: Store, taskUserSettingsId: Id): Store => {
    const taskUserSettings: TaskUserSettings = store.taskUserSettingsMap[taskUserSettingsId];
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

const toggleTaskUserSettingsStarredValue = (store: Store, taskUserSettingsId: Id): Store => {
    const taskUserSettings: TaskUserSettings = store.taskUserSettingsMap[taskUserSettingsId];
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

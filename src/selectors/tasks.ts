import * as stores from '../stores/tasks';
import { selectLocalizedText } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './tax';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTermReferences: ReadonlyArray<TaxonomyTermReference>;
    readonly category: string;
    readonly importance: number;
    // TODO remove
    readonly tags: ReadonlyArray<string>;
    readonly taskUserSettingsId: string;
    readonly starred: boolean;
    readonly completed: boolean;
}

export const denormalizeTask =
    (locale: Locale, task: stores.Task, taskUserSettings: stores.TaskUserSettings): Task => (
        {
            id: task.id,
            title: selectLocalizedText(locale, task.title),
            description: selectLocalizedText(locale, task.description),
            taxonomyTermReferences: task.taxonomyTermReferences,
            category: task.category,
            importance: task.importance,
            tags: task.tags,
            taskUserSettingsId: taskUserSettings.id,
            starred: taskUserSettings.starred,
            completed: taskUserSettings.completed,
        }
    );

export const selectAllSavedTasks = (locale: Locale, store: stores.Store): ReadonlyArray<Task> => {
    const { savedTasksList, taskMap }: stores.Store = store;
    return savedTasksList.map((taskId: stores.Id) => {
        const task: stores.Task = taskMap[taskId];
        const taskUserSettings = selectTaskUserSettingsByTaskId(store, task.id);
        return denormalizeTask(locale, task, taskUserSettings);
    });
};

export const selectAllSuggestedTasks = (locale: Locale, store: stores.Store): ReadonlyArray<Task> => {
    const { suggestedTasksList, taskMap }: stores.Store = store;
    return suggestedTasksList.map((taskId: stores.Id) => {
        const task: stores.Task = taskMap[taskId];
        const taskUserSettings = selectTaskUserSettingsByTaskId(store, task.id);
        return denormalizeTask(locale, task, taskUserSettings);
    });
};

export const selectTaskById = (locale: Locale, store: stores.Store, taskId: stores.Id): Task => {
    const { taskMap }: stores.Store = store;
    if (taskMap[taskId] === undefined) {
        throw new Error(`Could not find Task for task id: ${taskId}`);
    }
    const taskUserSettings = selectTaskUserSettingsByTaskId(store, taskId);
    return denormalizeTask(locale, taskMap[taskId], taskUserSettings);
};

export const selectTaskUserSettingsByTaskId = (store: stores.Store, taskId: stores.Id): stores.TaskUserSettings => {
    const { taskUserSettingsMap }: stores.Store = store;
    const id: stores.Id =
        Object.keys(taskUserSettingsMap).find((key: string) => (
            taskUserSettingsMap[key].taskId === taskId
        ));
    if (id === undefined) {
        throw new Error(`Could not find TaskUserSettings for task id: ${taskId}`);
    }
    return taskUserSettingsMap[id];
};

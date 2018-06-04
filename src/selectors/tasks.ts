import * as stores from '../stores/tasks';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly category: string;
    readonly importance: number;
    readonly tags: ReadonlyArray<string>;
    readonly taskUserSettingsId: string;
    readonly starred: boolean;
    readonly completed: boolean;
}

export const denormalizeTask = (task: stores.Task, taskUserSettings: stores.TaskUserSettings): Task => (
    {
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        importance: task.importance,
        tags: task.tags,
        taskUserSettingsId: taskUserSettings.id,
        starred: taskUserSettings.starred,
        completed: taskUserSettings.completed,
    }
);

export const selectAllSavedTasks = ({ savedTasksList, taskMap, taskUserSettingsMap }: stores.Store): ReadonlyArray<Task> => (
    savedTasksList.map((id: stores.Id) => {
        const task: stores.Task = taskMap[id];
        const taskUserSettingsId = fetchTaskUserSettingsIdByTaskId(taskUserSettingsMap, task.id);
        const taskUserSettings: stores.TaskUserSettings = taskUserSettingsMap[taskUserSettingsId];
        return denormalizeTask(task, taskUserSettings);
    })
);

export const selectAllSuggestedTasks = ({ suggestedTasksList, taskMap, taskUserSettingsMap }: stores.Store): ReadonlyArray<Task> => (
    suggestedTasksList.map((id: stores.Id) => {
        const task: stores.Task = taskMap[id];
        const taskUserSettingsId = fetchTaskUserSettingsIdByTaskId(taskUserSettingsMap, task.id);
        const taskUserSettings: stores.TaskUserSettings = taskUserSettingsMap[taskUserSettingsId];
        return denormalizeTask(task, taskUserSettings);
    })
);

export const selectTaskById = ({ taskMap, taskUserSettingsMap }: stores.Store, taskId: stores.Id): Task => {
    const taskUserSettingsId = fetchTaskUserSettingsIdByTaskId(taskUserSettingsMap, taskId);
    return denormalizeTask(taskMap[taskId], taskUserSettingsMap[taskUserSettingsId]);
};

export const fetchTaskUserSettingsIdByTaskId = (taskUserSettingsMap: stores.TaskUserSettingsMap, taskId: stores.Id): stores.Id => (
    Object.keys(taskUserSettingsMap).find((key: string) => (
        taskUserSettingsMap[key].taskId === taskId
    ))
);
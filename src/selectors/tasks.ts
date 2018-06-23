import * as stores from '../stores/tasks';
import * as app from '../application/store';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import { pickCurrentExploreSection } from './explore';
import * as taskDetails from './details/tasks';
import * as R from 'ramda';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
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
            taxonomyTerms: task.taxonomyTerms,
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
        const taskUserSettings = findTaskUserSettingsByTaskId(store.taskUserSettingsMap, task.id);
        return denormalizeTask(locale, task, taskUserSettings);
    });
};

export const selectAllSuggestedTasks = (locale: Locale, store: stores.Store): ReadonlyArray<Task> => {
    const { suggestedTasksList, taskMap }: stores.Store = store;
    return suggestedTasksList.map((taskId: stores.Id) => {
        const task: stores.Task = taskMap[taskId];
        const taskUserSettings = findTaskUserSettingsByTaskId(store.taskUserSettingsMap, task.id);
        return denormalizeTask(locale, task, taskUserSettings);
    });
};

export const selectTaskById = (locale: Locale, store: stores.Store, taskId: stores.Id): Task => {
    const { taskMap }: stores.Store = store;
    if (taskMap[taskId] === undefined) {
        throw new Error(`Could not find Task for task id: ${taskId}`);
    }
    const taskUserSettings = findTaskUserSettingsByTaskId(store.taskUserSettingsMap, taskId);
    return denormalizeTask(locale, taskMap[taskId], taskUserSettings);
};

export const findTaskUserSettingsByTaskId =
    (taskUserSettingsMap: stores.TaskUserSettingsMap, taskId: stores.Id): stores.TaskUserSettings => {
        const validate = validateOneResultWasFound(taskId);
        const getUserTask = R.compose(validate, R.values, R.pickBy(R.propEq('taskId', taskId)));
        return getUserTask(taskUserSettingsMap);
    };

const validateOneResultWasFound =
    R.curry((taskId: string, userTasks: ReadonlyArray<stores.TaskUserSettings>): stores.TaskUserSettings => {
        if (userTasks.length !== 1) {
            throw new Error(`Could not find TaskUserSettings for task id: ${taskId}`);
        }
        return userTasks[0];
    });

export const selectTasksForCurrentExploreSection = (store: app.Store): ReadonlyArray<Task> => {
    const exploreSection = pickCurrentExploreSection(store);
    const tasks = store.applicationState.tasksInStore.taskMap;
    const matchingTasks = taskDetails.findTasksByExploreTaxonomyTerm(exploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(store);
    const userTasks = store.applicationState.tasksInStore.taskUserSettingsMap;
    const denormalizedTasks = R.map(buildDenormalizedTask(locale, userTasks), matchingTasks);

    return denormalizedTasks;
};

const buildDenormalizedTask = R.curry((locale: Locale, userTasks: stores.TaskUserSettingsMap, task: stores.Task): Task => {
    const userTask = findTaskUserSettingsByTaskId(userTasks, task.id);
    return denormalizeTask(locale, task, userTask);
});

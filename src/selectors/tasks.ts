import * as app from '../application/store';
import * as model from '../stores/tasks';
import * as taskDetails from './details/tasks';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { selectRoute } from './route';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import { pickCurrentExploreSection } from './explore';
import { ArticleListItem, selectRelatedArticles } from './articles';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly category: string;
    readonly importance: number;
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
    // TODO remove
    readonly tags: ReadonlyArray<string>;
    readonly starred: boolean;
    readonly completed: boolean;
}

export interface TaskListItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
}

export const denormalizeTask =
    (locale: Locale, task: model.Task, taskUserSettings: model.TaskUserSettings,
     relatedArticles: ReadonlyArray<ArticleListItem>, relatedTasks: ReadonlyArray<TaskListItem>): Task => (
        {
            id: task.id,
            title: selectLocalizedText(locale, task.title),
            description: selectLocalizedText(locale, task.description),
            taxonomyTerms: task.taxonomyTerms,
            relatedArticles: relatedArticles,
            relatedTasks: relatedTasks,
            category: task.category,
            importance: task.importance,
            tags: task.tags,
            starred: taskUserSettings.starred,
            completed: taskUserSettings.completed,
        }
    );

export const denormalizeTaskListItem = (locale: Locale, task: model.Task): TaskListItem => (
        {
            id: task.id,
            title: selectLocalizedText(locale, task.title),
            description: selectLocalizedText(locale, task.description),
        }
    );

export const selectAllSavedTasks = (store: app.Store): ReadonlyArray<TaskListItem> => {
    const savedTasksList = store.applicationState.tasksInStore.savedTasksList;
    return savedTasksList.map((taskId: model.Id) => {
        return selectTaskAsListItem(store, taskId);
    });
};

export const selectAllSuggestedTasks = (store: app.Store): ReadonlyArray<TaskListItem> => {
    const suggestedTasksList = store.applicationState.tasksInStore.suggestedTasksList;
    return suggestedTasksList.map((taskId: model.Id) => {
        return selectTaskAsListItem(store, taskId);
    });
};

export const selectCurrentTask = (store: app.Store): Task => {
    const locale = selectLocale(store);
    const taskMap = store.applicationState.tasksInStore.taskMap;
    const taskUserSettingsMap = store.applicationState.tasksInStore.taskUserSettingsMap;
    const taskId = selectRoute(store).pageId;
    const taskUserSettings = model.findTaskUserSettingsByTaskId(taskUserSettingsMap, taskId);
    const task = taskMap[taskId];
    const relatedTasks = selectRelatedTasks(store, task.relatedTasks);
    const relatedArticles = selectRelatedArticles(store, task.relatedArticles);
    return denormalizeTask(locale, task, taskUserSettings, relatedArticles, relatedTasks);
};

export const selectRelatedTasks = (store: app.Store, taskIds: ReadonlyArray<model.Id>): ReadonlyArray<TaskListItem> => (
    R.map((id: model.Id) => selectTaskAsListItem(store, id), taskIds)
);

export const selectTaskAsListItem = (store: app.Store, taskId: model.Id): TaskListItem => {
    const locale = selectLocale(store);
    const taskMap = store.applicationState.tasksInStore.taskMap;
    const task = taskMap[taskId];
    return denormalizeTaskListItem(locale, task);
};

export const selectTasksForCurrentExploreSection = (store: app.Store): ReadonlyArray<Task> => {
    const exploreSection = pickCurrentExploreSection(store);
    const tasks = store.applicationState.tasksInStore.taskMap;
    const matchingTasks = taskDetails.findTasksByExploreTaxonomyTerm(exploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(store);
    const userTasks = store.applicationState.tasksInStore.taskUserSettingsMap;
    const denormalizedTasks = R.map(buildDenormalizedTask(locale, userTasks), matchingTasks);

    return denormalizedTasks;
};

const buildDenormalizedTask = R.curry((locale: Locale, userTasks: model.TaskUserSettingsMap, task: model.Task): Task => {
    const userTask = model.findTaskUserSettingsByTaskId(userTasks, task.id);
    return denormalizeTask(locale, task, userTask, [], []);
});

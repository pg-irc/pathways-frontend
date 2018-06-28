import * as app from '../application/store';
import * as model from '../stores/tasks';
import * as taskDetails from './details/tasks';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import { pickCurrentExploreSection } from './explore';
import { Article, selectArticleAsListItem } from './articles';
import { Id as ArticleId } from '../stores/articles';
import { selectRoute } from './route';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly category: string;
    readonly importance: number;
    readonly relatedTasks?: ReadonlyArray<Task>;
    readonly relatedArticles?: ReadonlyArray<Article>;
    // TODO remove
    readonly tags: ReadonlyArray<string>;
    readonly taskUserSettingsId: string;
    readonly starred: boolean;
    readonly completed: boolean;
}

export const denormalizeTask =
    (locale: Locale, task: model.Task, taskUserSettings: model.TaskUserSettings): Task => (
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

export const selectAllSavedTasks = (store: app.Store): ReadonlyArray<Task> => {
    const locale = selectLocale(store);
    const { savedTasksList, taskMap, taskUserSettingsMap }: model.Store = store.applicationState.tasksInStore;
    return savedTasksList.map((taskId: model.Id) => {
        const task: model.Task = taskMap[taskId];
        const taskUserSettings = findTaskUserSettingsByTaskId(taskUserSettingsMap, task.id);
        return denormalizeTask(locale, task, taskUserSettings);
    });
};

export const selectAllSuggestedTasks = (store: app.Store): ReadonlyArray<Task> => {
    const locale = selectLocale(store);
    const { suggestedTasksList, taskMap, taskUserSettingsMap }: model.Store = store.applicationState.tasksInStore;
    return suggestedTasksList.map((taskId: model.Id) => {
        const task: model.Task = taskMap[taskId];
        const taskUserSettings = findTaskUserSettingsByTaskId(taskUserSettingsMap, task.id);
        return denormalizeTask(locale, task, taskUserSettings);
    });
};

export const selectCurrentTask = (store: app.Store): Task => {
    const locale = selectLocale(store);
    const { taskMap, taskUserSettingsMap }: model.Store = store.applicationState.tasksInStore;
    const taskId = selectRoute(store).pageId;
    const taskUserSettings = findTaskUserSettingsByTaskId(taskUserSettingsMap, taskId);
    const task = taskMap[taskId];
    const relatedTasks = task.relatedTasks ?
        R.map((id: model.Id) => selectTaskAsListItem(store, id), task.relatedTasks) : undefined;
    const relatedArticles = task.relatedArticles ?
        R.map((id: ArticleId) => selectArticleAsListItem(store, id), task.relatedArticles) : undefined;
    return { ...denormalizeTask(locale, task, taskUserSettings), relatedTasks, relatedArticles };
};

export const selectTaskAsListItem = (store: app.Store, taskId: model.Id): Task => {
    const locale = selectLocale(store);
    const { taskMap, taskUserSettingsMap }: model.Store = store.applicationState.tasksInStore;
    const task = taskMap[taskId];
    const taskUserSettings = findTaskUserSettingsByTaskId(taskUserSettingsMap, taskId);
    return denormalizeTask(locale, task, taskUserSettings);
};

export const findTaskUserSettingsByTaskId =
    (taskUserSettingsMap: model.TaskUserSettingsMap, taskId: model.Id): model.TaskUserSettings => {
        const validate = validateOneResultWasFound(taskId);
        const getUserTask = R.compose(validate, R.values, R.pickBy(R.propEq('taskId', taskId)));
        return getUserTask(taskUserSettingsMap);
    };

const validateOneResultWasFound =
    R.curry((taskId: string, userTasks: ReadonlyArray<model.TaskUserSettings>): model.TaskUserSettings => {
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

const buildDenormalizedTask = R.curry((locale: Locale, userTasks: model.TaskUserSettingsMap, task: model.Task): Task => {
    const userTask = findTaskUserSettingsByTaskId(userTasks, task.id);
    return denormalizeTask(locale, task, userTask);
});

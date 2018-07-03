import * as app from '../application/store';
import * as model from '../stores/tasks';
import * as taskDetails from './details/tasks';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { selectRoute } from './route';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import { pickCurrentExploreSection } from './explore';
import { Article, selectRelatedArticles } from './articles';

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
    (locale: Locale, task: model.Task, taskUserSettings: model.TaskUserSettings,
     relatedArticles: ReadonlyArray<Article>, relatedTasks: ReadonlyArray<Task>): Task => (
        {
            id: task.id,
            title: selectLocalizedText(locale, task.title),
            description: selectLocalizedText(locale, task.description),
            taxonomyTerms: task.taxonomyTerms,
            starred: taskUserSettings.starred,
            relatedArticles: relatedArticles,
            relatedTasks: relatedTasks,
            taskUserSettingsId: taskUserSettings.id,
            category: task.category,
            importance: task.importance,
            tags: task.tags,
            completed: taskUserSettings.completed,
        }
    );

export const selectAllSavedTasks = (store: app.Store): ReadonlyArray<Task> => {
    const { savedTasksList }: model.Store = store.applicationState.tasksInStore;
    return savedTasksList.map((taskId: model.Id) => {
        return selectTaskAsListItem(store, taskId);
    });
};

export const selectAllSuggestedTasks = (store: app.Store): ReadonlyArray<Task> => {
    const { suggestedTasksList }: model.Store = store.applicationState.tasksInStore;
    return suggestedTasksList.map((taskId: model.Id) => {
        return selectTaskAsListItem(store, taskId);
    });
};

export const selectCurrentTask = (store: app.Store): Task => {
    const locale = selectLocale(store);
    const { taskMap, taskUserSettingsMap }: model.Store = store.applicationState.tasksInStore;
    const taskId = selectRoute(store).pageId;
    const taskUserSettings = findTaskUserSettingsByTaskId(taskUserSettingsMap, taskId);
    const task = taskMap[taskId];
    const relatedTasks = selectRelatedTasks(store, task.relatedTasks);
    const relatedArticles = selectRelatedArticles(store, task.relatedArticles);
    return denormalizeTask(locale, task, taskUserSettings, relatedArticles, relatedTasks);
};

export const selectRelatedTasks = (store: app.Store, taskIds: ReadonlyArray<model.Id>): ReadonlyArray<Task> => (
    R.map((id: model.Id) => selectTaskAsListItem(store, id), taskIds)
);

export const selectTaskAsListItem = (store: app.Store, taskId: model.Id): Task => {
    const locale = selectLocale(store);
    const { taskMap, taskUserSettingsMap }: model.Store = store.applicationState.tasksInStore;
    const task = taskMap[taskId];
    const taskUserSettings = findTaskUserSettingsByTaskId(taskUserSettingsMap, taskId);
    return denormalizeTask(locale, task, taskUserSettings, [], []);
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
    return denormalizeTask(locale, task, userTask, [], []);
});

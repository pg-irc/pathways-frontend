import * as stores from '../stores/tasks';
import * as app from '../application/store';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import * as R from 'ramda';
import { selectRoute } from './route';
import { ExploreTaxonomyId } from '../stores/taxonomies';
import { Page } from '../stores/page_switcher';
import { ExploreSection } from '../stores/explore';

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
            taxonomyTermReferences: task.taxonomyTerms,
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

// TODO move to route
const selectCurrentExploreSectionId = (store: app.Store): stores.Id => {
    const route = selectRoute(store);
    if (route.pageType !== Page.ExploreSection) {
        throw new Error('The current route is not an explore section');
    }
    return route.pageId;
};

// TODO move to explore
const selectCurrentExploreSection = (store: app.Store): ExploreSection => {
    const sectionId = selectCurrentExploreSectionId(store);
    return store.applicationState.exploreSectionsInStore.sections[sectionId];
};

export const selectTasksForCurrentExploreSection = (store: app.Store): ReadonlyArray<Task> => {
    const locale = selectLocale(store);
    const exploreSection = selectCurrentExploreSection(store);
    const tasks = store.applicationState.tasksInStore.taskMap;
    const userTasks = store.applicationState.tasksInStore.taskUserSettingsMap;
    const matchingTasks = findTasksByExploreTaxonomyTerm(exploreSection.taxonomyTerms, tasks);

    return R.map(buildTaskForView(locale, userTasks), matchingTasks);
};

// TODO move to detail/task
const buildTaskForView = R.curry((locale: Locale, userTasks: stores.TaskUserSettingsMap, task: stores.Task): Task => {
    const userTask = findTaskUserSettingsByTaskId(userTasks, task.id);
    return denormalizeTask(locale, task, userTask);
});

// TODO move to taxonomy
// TODO take taxonomy id as argument, don't assume one return value
// TODO pick out taxonomyTerms property, making this more generic?
const getExploreTaxonomyTerms = R.filter(R.propEq('taxonomyId', ExploreTaxonomyId));

// TODO move to detail/task
// TODO take taxonomy id as argument, don't assume one return value
export const findTasksByExploreTaxonomyTerm =
    (needle: ReadonlyArray<TaxonomyTermReference>, tasks: stores.TaskMap): ReadonlyArray<stores.Task> => {

        const needleTerms = getExploreTaxonomyTerms(needle);

        const matchesTaxonomyTerm = (task: stores.Task): boolean => {
            const haystackTerms = getExploreTaxonomyTerms(task.taxonomyTerms);
            const commonTerms = R.intersection(needleTerms, haystackTerms);
            return R.length(commonTerms) > 0;
        };

        const findTasks = R.compose(R.values, R.pickBy(matchesTaxonomyTerm));

        return findTasks(tasks);
    };

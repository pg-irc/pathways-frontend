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
import { selectTaxonomyTermsForSelectedAnswers } from './questionnaire';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly category: string;
    readonly importance: number;
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
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
                starred: taskUserSettings.starred,
                relatedArticles: relatedArticles,
                relatedTasks: relatedTasks,
                category: task.category,
                importance: task.importance,
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

export const selectCurrentTask = (store: app.Store): Task => {
    const locale = selectLocale(store);
    const taskMap = store.applicationState.tasksInStore.taskMap;
    const taskUserSettingsMap = store.applicationState.tasksInStore.taskUserSettingsMap;
    const taskId = selectRoute(store).pageId;
    const taskUserSettings = findTaskUserSettingsByTaskId(taskUserSettingsMap, taskId);
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

export const selectRecommendedTasks = (store: app.Store): ReadonlyArray<Task> => {
    const taxonomyTerms = selectTaxonomyTermsForSelectedAnswers(store);
    const matchingTasks = filterTasksByTaxonomyTerms(taxonomyTerms, store.applicationState.tasksInStore.taskMap);

    const locale = selectLocale(store);
    const userTasks = store.applicationState.tasksInStore.taskUserSettingsMap;
    return R.map(buildDenormalizedTask(locale, userTasks), matchingTasks);
};

export const filterTasksByTaxonomyTerms =
    (selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, taskMap: model.TaskMap): ReadonlyArray<model.Task> => {

        const taskContainsTaxonomyTerms = R.curry((targetTerms: ReadonlyArray<TaxonomyTermReference>, task: model.Task): boolean => (
            R.not(R.isEmpty(R.intersection(targetTerms, task.taxonomyTerms)))
        ));

        const taxonomyId = 'recommendation';
        const taxonomyTermId = 'recommendToAll';

        const isRecommendedToAll = taskContainsTaxonomyTerms([{ taxonomyId, taxonomyTermId }]);
        const isRecommendedBecauseOfSelecedAnswers = taskContainsTaxonomyTerms(selectedAnswerTaxonomyTerms);

        const isRecommended = R.either(isRecommendedToAll, isRecommendedBecauseOfSelecedAnswers);

        return R.filter(isRecommended, R.values(taskMap));
    };

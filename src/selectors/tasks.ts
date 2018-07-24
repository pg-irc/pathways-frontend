import { Store } from '../stores';
import * as model from '../stores/tasks';
import * as taskDetails from './details/tasks';
import { Taxonomies as TaxonomyConstants } from '../application/constants';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import { ArticleListItem, selectRelatedArticles } from './articles';
import { selectTaxonomyTermsForSelectedAnswers } from './questionnaire';
import { RouterProps } from '../application/routing';

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

export const selectAllSavedTasks = (store: Store): ReadonlyArray<TaskListItem> => {
    const savedTasksList = store.tasksInStore.savedTasksList;
    return savedTasksList.map((taskId: model.Id) => {
        return selectTaskAsListItem(store, taskId);
    });
};

export const selectRelatedTasks = (store: Store, taskIds: ReadonlyArray<model.Id>): ReadonlyArray<TaskListItem> => (
    R.map((id: model.Id) => selectTaskAsListItem(store, id), taskIds)
);

export const selectTaskAsListItem = (store: Store, taskId: model.Id): TaskListItem => {
    const locale = selectLocale(store);
    const taskMap = store.tasksInStore.taskMap;
    const task = taskMap[taskId];
    return denormalizeTaskListItem(locale, task);
};

const buildDenormalizedTask = R.curry((locale: Locale, userTasks: model.TaskUserSettingsMap, task: model.Task): Task => {
    const userTask = model.findTaskUserSettingsByTaskId(userTasks, task.id);
    return denormalizeTask(locale, task, userTask, [], []);
});

export const selectRecommendedTasks = (store: Store): ReadonlyArray<Task> => {
    const taxonomyTerms = selectTaxonomyTermsForSelectedAnswers(store);
    const matchingTasks = filterTasksByTaxonomyTerms(taxonomyTerms, store.tasksInStore.taskMap);

    const locale = selectLocale(store);
    const userTasks = store.tasksInStore.taskUserSettingsMap;
    return R.map(buildDenormalizedTask(locale, userTasks), matchingTasks);
};

export const filterTasksByTaxonomyTerms =
    (selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, taskMap: model.TaskMap): ReadonlyArray<model.Task> => {

        const taskContainsTaxonomyTerms = R.curry((targetTerms: ReadonlyArray<TaxonomyTermReference>, task: model.Task): boolean => (
            R.not(R.isEmpty(R.intersection(targetTerms, task.taxonomyTerms)))
        ));

        const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
        const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;

        const isRecommendedToAll = taskContainsTaxonomyTerms([{ taxonomyId, taxonomyTermId }]);
        const isRecommendedBecauseOfSelecedAnswers = taskContainsTaxonomyTerms(selectedAnswerTaxonomyTerms);

        const isRecommended = R.either(isRecommendedToAll, isRecommendedBecauseOfSelecedAnswers);

        return R.filter(isRecommended, R.values(taskMap));
    };

export const selectTask = (store: Store, routerProps: RouterProps): Task => {
    const locale = selectLocale(store);
    const taskId = routerProps.match.params.taskId;
    const taskMap = store.tasksInStore.taskMap;
    const taskUserSettingsMap = store.tasksInStore.taskUserSettingsMap;
    const taskUserSettings = model.findTaskUserSettingsByTaskId(taskUserSettingsMap, taskId);
    const task = taskMap[taskId];
    const relatedTasks = selectRelatedTasks(store, task.relatedTasks);
    const relatedArticles = selectRelatedArticles(store, task.relatedArticles);
    return denormalizeTask(locale, task, taskUserSettings, relatedArticles, relatedTasks);
};

export const selectTasksForLearn = (store: Store, routerProps: RouterProps): ReadonlyArray<Task> => {
    const exploreSection = store.exploreSectionsInStore.sections[routerProps.match.params.learnId];
    const tasks = store.tasksInStore.taskMap;
    const matchingTasks = taskDetails.findTasksByExploreTaxonomyTerm(exploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(store);
    const userTasks = store.tasksInStore.taskUserSettingsMap;
    const denormalizedTasks = R.map(buildDenormalizedTask(locale, userTasks), matchingTasks);

    return denormalizedTasks;
};

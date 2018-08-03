import { Store } from '../stores';
import * as model from '../stores/tasks';
import * as taskDetails from './details/tasks';
import { Taxonomies as TaxonomyConstants } from '../application/constants';
import * as R from 'ramda';
import { selectLocalizedText, selectLocale } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference, selectExploreTaxonomy } from './taxonomies';
import { ArticleListItem, selectRelatedArticles } from './articles';
import { selectTaxonomyTermsForSelectedAnswers } from './questionnaire';
import { RouterProps } from '../application/routing';
import { ExploreSection } from './explore';
import { buildExploreSection } from './details/explore';
import { selectIconFromExploreTaxonomy } from './select_icon_from_explore_taxonomy';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly exploreSection: ExploreSection;
    readonly isRecommended: boolean;
    readonly category: string;
    readonly importance: number;
    readonly relatedTasks: TaskListItemList;
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
    readonly completed: boolean;
}

export interface TaskListItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly isRecommended: boolean;
    readonly completed: boolean;
}

export const denormalizeTask =
    (locale: Locale, task: model.Task, exploreSection: ExploreSection, isRecommended: boolean,
        relatedArticles: ReadonlyArray<ArticleListItem>, relatedTasks: TaskListItemList): Task => (
            {
                id: task.id,
                title: selectLocalizedText(locale, task.title),
                description: selectLocalizedText(locale, task.description),
                taxonomyTerms: task.taxonomyTerms,
                exploreSection: exploreSection,
                isRecommended: isRecommended,
                relatedArticles: relatedArticles,
                relatedTasks: relatedTasks,
                category: task.category,
                importance: task.importance,
                completed: task.completed,
            }
        );

export const denormalizeTaskListItem = (locale: Locale, task: model.Task, isRecommended: boolean): TaskListItem => (
    {
        id: task.id,
        title: selectLocalizedText(locale, task.title),
        description: selectLocalizedText(locale, task.description),
        isRecommended: isRecommended,
        completed: task.completed,
    }
);

export type TaskList = ReadonlyArray<Task>;
export type TaskListItemList = ReadonlyArray<TaskListItem>;
export type TaskModelList = ReadonlyArray<model.Task>;
export type TaskIdList = ReadonlyArray<model.Id>;

export const selectSavedTasks = (store: Store): TaskListItemList => {
    const savedTasksList = store.tasksInStore.savedTasksList;
    return savedTasksList.map((taskId: model.Id) => {
        return selectTaskAsListItem(store, taskId);
    });
};

export const selectSavedTasksIdList = (store: Store): TaskIdList => (
    store.tasksInStore.savedTasksList
);

export const selectRelatedTasks = (store: Store, taskIds: TaskIdList): TaskListItemList => (
    R.map((taskId: model.Id) => selectTaskAsListItem(store, taskId), taskIds)
);

export const selectCompletedTasks = (store: Store): TaskListItemList => {
    const isCompleted = (task: model.Task): boolean => task.completed;
    const taskIds = R.keys(R.pickBy(isCompleted, store.tasksInStore.taskMap));
    return R.map((taskId: model.Id) => selectTaskAsListItem(store, taskId), taskIds);
};

export const selectTaskAsListItem = (store: Store, taskId: model.Id): TaskListItem => {
    const locale = selectLocale(store);
    const taskMap = store.tasksInStore.taskMap;
    const task = taskMap[taskId];
    const termsFromQuestionnaire = selectTaxonomyTermsForSelectedAnswers(store);
    const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
    return denormalizeTaskListItem(locale, task, isRecommended);
};

const denormalizeTasksWithoutRelatedEntities = (locale: Locale, task: model.Task, exploreSection: ExploreSection, isRecommended: boolean): Task => {
    return denormalizeTask(locale, task, exploreSection, isRecommended, [], []);
};

export const selectRecommendedTasks = (store: Store): TaskList => {
    const taxonomyTerms = selectTaxonomyTermsForSelectedAnswers(store);
    const filterTasks = filterTasksByTaxonomyTerms(taxonomyTerms);

    const savedTaskIds = store.tasksInStore.savedTasksList;
    const rejectSavedTasks = rejectTasksWithIdsInList(savedTaskIds);

    const allTasks = store.tasksInStore.taskMap;
    const matchingTasks = filterTasks(allTasks);
    const nonSavedTasks = rejectSavedTasks(matchingTasks);
    const nonCompletedTasks = rejectCompletedTasks(nonSavedTasks);

    const locale = selectLocale(store);
    const toSelectorTask = (task: model.Task): Task => {
        const exploreSection = selectExploreSectionFromTask(store, task);
        const isRecommended = true;
        return denormalizeTasksWithoutRelatedEntities(locale, task, exploreSection, isRecommended);
    };

    return R.map(toSelectorTask, nonCompletedTasks);
};

const selectExploreSectionFromTask = (store: Store, task: model.Task): ExploreSection => {
    const storeExploreSection = taskDetails.findExploreSectionBy(task, store.exploreSectionsInStore.sections);
    const exploreTaxonomy = selectExploreTaxonomy(store);
    const icon = selectIconFromExploreTaxonomy(storeExploreSection.taxonomyTerms, exploreTaxonomy);
    const locale = selectLocale(store);

    return buildExploreSection(locale, storeExploreSection, icon);
};

export const rejectTasksWithIdsInList =
    R.curry((listOfIds: model.TaskList, tasks: TaskModelList): TaskModelList => {
        const idIsInList = (task: model.Task): boolean => (
            R.contains(task.id, listOfIds)
        );
        return R.reject(idIsInList, tasks);
    });

export const rejectCompletedTasks = R.reject(R.prop('completed'));

export const filterTasksByTaxonomyTerms =
    R.curry((selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, taskMap: model.TaskMap): TaskModelList => {

        const taskContainsTaxonomyTerms = R.curry((targetTerms: ReadonlyArray<TaxonomyTermReference>, task: model.Task): boolean => (
            R.not(R.isEmpty(R.intersection(targetTerms, task.taxonomyTerms)))
        ));

        const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
        const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;

        const isRecommendedToAll = taskContainsTaxonomyTerms([{ taxonomyId, taxonomyTermId }]);
        const isRecommendedBecauseOfSelecedAnswers = taskContainsTaxonomyTerms(selectedAnswerTaxonomyTerms);

        const isRecommended = R.either(isRecommendedToAll, isRecommendedBecauseOfSelecedAnswers);

        return R.filter(isRecommended, R.values(taskMap));
    });

export const selectTask = (store: Store, routerProps: RouterProps): Task => {
    const locale = selectLocale(store);
    const taskId = routerProps.match.params.taskId;
    const taskMap = store.tasksInStore.taskMap;
    const task = taskMap[taskId];
    const exploreSection = selectExploreSectionFromTask(store, task);
    const termsFromQuestionnaire = selectTaxonomyTermsForSelectedAnswers(store);
    const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
    const relatedTasks = selectRelatedTasks(store, task.relatedTasks);
    const relatedArticles = selectRelatedArticles(store, task.relatedArticles);
    return denormalizeTask(locale, task, exploreSection, isRecommended, relatedArticles, relatedTasks);
};

export const isTaskRecommended = (termsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference>, task: model.Task): boolean => {
    const taskMapWithTask = { [task.id]: task };
    const filtered = filterTasksByTaxonomyTerms(termsFromQuestionnaire, taskMapWithTask);
    return !R.isEmpty(filtered);
};

export const selectTasksForLearn = (store: Store, routerProps: RouterProps): TaskList => {
    const exploreSection = store.exploreSectionsInStore.sections[routerProps.match.params.learnId];
    const tasks = store.tasksInStore.taskMap;
    const matchingTasks = taskDetails.findItemByLearnTaxonomyTerm(exploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(store);

    const buildTask = (task: model.Task): Task => {
        const exploreSectionForTask = selectExploreSectionFromTask(store, task);
        const termsFromQuestionnaire = selectTaxonomyTermsForSelectedAnswers(store);
        const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
        return denormalizeTasksWithoutRelatedEntities(locale, task, exploreSectionForTask, isRecommended);
    };

    return R.map(buildTask, matchingTasks);
};

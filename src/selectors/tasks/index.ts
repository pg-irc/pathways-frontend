import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import * as taskDetails from '../explore/find_explore_section_by';
import { Taxonomies as TaxonomyConstants } from '../../application/constants';
import { Locale } from '../../locale/types';
import { TaxonomyTermReference, pullExploreTaxonomy } from '../taxonomies/pull_explore_taxonomy';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { RouterProps } from '../../application/routing';
import { ExploreSection } from '../explore/types';
import { selectIconFromExploreTaxonomy } from '../explore/select_icon_from_explore_taxonomy';
import { toSelectorArticleList } from '../articles/to_selector_article_list';
import { buildExploreSection } from '../explore/build_explore_section';
import { selectLocale } from '../locale/select_locale';
import { findItemByLearnTaxonomyTerm } from '../taxonomies/find_item_by_explore_taxonomy_term';
import { toSelectorTask } from './to_selector_task';
import { toSelectorTaskListItem } from './to_selector_task_list_item';
import { Task } from './task';
import { TaskListItem } from './task_list_item';

export const selectSavedTasks = (appStore: Store): ReadonlyArray<TaskListItem> => {
    const savedTasksList = appStore.tasksInStore.savedTasksList;
    return savedTasksList.map((taskId: store.Id) => {
        return selectTaskAsListItem(appStore, taskId);
    });
};

export const selectSavedTasksIdList = (appStore: Store): ReadonlyArray<store.Id> => (
    appStore.tasksInStore.savedTasksList
);

export const selectRelatedTasks = (appStore: Store, taskIds: ReadonlyArray<store.Id>): ReadonlyArray<TaskListItem> => (
    R.map((taskId: store.Id) => selectTaskAsListItem(appStore, taskId), taskIds)
);

export const selectCompletedTasks = (appStore: Store): ReadonlyArray<TaskListItem> => {
    const isCompleted = (task: store.Task): boolean => task.completed;
    const taskIds = R.keys(R.pickBy(isCompleted, appStore.tasksInStore.taskMap));
    return R.map((taskId: store.Id) => selectTaskAsListItem(appStore, taskId), taskIds);
};

export const selectTaskAsListItem = (appStore: Store, taskId: store.Id): TaskListItem => {
    const locale = selectLocale(appStore);
    const taskMap = appStore.tasksInStore.taskMap;
    const task = taskMap[taskId];
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
    return toSelectorTaskListItem(locale, task, isRecommended);
};

const denormalizeTasksWithoutRelatedEntities = (locale: Locale, task: store.Task, exploreSection: ExploreSection, isRecommended: boolean): Task => {
    return toSelectorTask(locale, task, exploreSection, isRecommended, [], []);
};

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => {
    const taxonomyTerms = selectTaxonomyTermsForChosenAnswers(appStore);
    const filterTasks = filterTasksByTaxonomyTerms(taxonomyTerms);

    const savedTaskIds = appStore.tasksInStore.savedTasksList;
    const rejectSavedTasks = rejectTasksWithIdsInList(savedTaskIds);

    const allTasks = appStore.tasksInStore.taskMap;
    const matchingTasks = filterTasks(allTasks);
    const nonSavedTasks = rejectSavedTasks(matchingTasks);
    const nonCompletedTasks = rejectCompletedTasks(nonSavedTasks);

    const locale = selectLocale(appStore);
    const buildSelectorTask = (task: store.Task): Task => {
        const exploreSection = selectExploreSectionFromTask(appStore, task);
        const isRecommended = true;
        return denormalizeTasksWithoutRelatedEntities(locale, task, exploreSection, isRecommended);
    };

    return R.map(buildSelectorTask, nonCompletedTasks);
};

const selectExploreSectionFromTask = (appStore: Store, task: store.Task): ExploreSection => {
    const storeExploreSection = taskDetails.findExploreSectionBy(task, appStore.exploreSectionsInStore.sections);
    const exploreTaxonomy = pullExploreTaxonomy(appStore);
    const icon = selectIconFromExploreTaxonomy(storeExploreSection.taxonomyTerms, exploreTaxonomy);
    const locale = selectLocale(appStore);

    return buildExploreSection(locale, storeExploreSection, icon);
};

export const rejectTasksWithIdsInList =
    R.curry((listOfIds: store.TaskList, tasks: ReadonlyArray<store.Task>): ReadonlyArray<store.Task> => {
        const idIsInList = (task: store.Task): boolean => (
            R.contains(task.id, listOfIds)
        );
        return R.reject(idIsInList, tasks);
    });

export const rejectCompletedTasks = R.reject(R.prop('completed'));

export const filterTasksByTaxonomyTerms =
    R.curry((selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, taskMap: store.TaskMap): ReadonlyArray<store.Task> => {

        const taskContainsTaxonomyTerms = R.curry((targetTerms: ReadonlyArray<TaxonomyTermReference>, task: store.Task): boolean => (
            R.not(R.isEmpty(R.intersection(targetTerms, task.taxonomyTerms)))
        ));

        const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
        const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;

        const isRecommendedToAll = taskContainsTaxonomyTerms([{ taxonomyId, taxonomyTermId }]);
        const isRecommendedBecauseOfSelecedAnswers = taskContainsTaxonomyTerms(selectedAnswerTaxonomyTerms);

        const isRecommended = R.either(isRecommendedToAll, isRecommendedBecauseOfSelecedAnswers);

        return R.filter(isRecommended, R.values(taskMap));
    });

export const selectTask = (appStore: Store, routerProps: RouterProps): Task => {
    const locale = selectLocale(appStore);
    const taskId = routerProps.match.params.taskId;
    const taskMap = appStore.tasksInStore.taskMap;
    const task = taskMap[taskId];
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
    const relatedTasks = selectRelatedTasks(appStore, task.relatedTasks);
    const relatedArticles = toSelectorArticleList(appStore, task.relatedArticles);
    return toSelectorTask(locale, task, exploreSection, isRecommended, relatedArticles, relatedTasks);
};

export const isTaskRecommended = (termsFromQuestionnaire: ReadonlyArray<TaxonomyTermReference>, task: store.Task): boolean => {
    const taskMapWithTask = { [task.id]: task };
    const filtered = filterTasksByTaxonomyTerms(termsFromQuestionnaire, taskMapWithTask);
    return !R.isEmpty(filtered);
};

export const selectTasksForLearn = (appStore: Store, routerProps: RouterProps): ReadonlyArray<Task> => {
    const exploreSection = appStore.exploreSectionsInStore.sections[routerProps.match.params.learnId];
    const tasks = appStore.tasksInStore.taskMap;
    const matchingTasks = findItemByLearnTaxonomyTerm(exploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(appStore);

    const buildTask = (task: store.Task): Task => {
        const exploreSectionForTask = selectExploreSectionFromTask(appStore, task);
        const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
        const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
        return denormalizeTasksWithoutRelatedEntities(locale, task, exploreSectionForTask, isRecommended);
    };

    return R.map(buildTask, matchingTasks);
};

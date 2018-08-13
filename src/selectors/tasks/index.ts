import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { Taxonomies as TaxonomyConstants } from '../../application/constants';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { RouterProps } from '../../application/routing';
import { toSelectorArticleList } from '../articles/to_selector_article_list';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTask } from './to_selector_task';
import { Task } from './task';
import { TaskListItem } from './task_list_item';
import { selectTaskAsListItem } from './select_task_as_list_item';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';

export const selectRelatedTasks = (appStore: Store, taskIds: ReadonlyArray<store.Id>): ReadonlyArray<TaskListItem> => (
    R.map((taskId: store.Id) => selectTaskAsListItem(appStore, taskId), taskIds)
);

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

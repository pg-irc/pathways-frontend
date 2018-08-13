import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { RouterProps } from '../../application/routing';
import { selectLocale } from '../locale/select_locale';
import { findItemByLearnTaxonomyTerm } from '../taxonomies/find_item_by_explore_taxonomy_term';
import { Task } from './task';
import { toSelectorTaskWithoutRelatedEntities } from './to_selector_task_without_related_entities';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { isTaskRecommended } from './is_task_recommended';
import { pickExploreSectionById } from '../explore/pick_explore_section_by_id';

export const selectTaskForCurrentExploreSection = (appStore: Store, routerProps: RouterProps): ReadonlyArray<Task> => {
    const currentExploreSection = pickExploreSectionById(appStore, routerProps.match.params.learnId);
    const tasks = appStore.tasksInStore.taskMap;
    const matchingTasks = findItemByLearnTaxonomyTerm(currentExploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(appStore);

    const buildTask = (task: store.Task): Task => {
        const exploreSectionForTask = selectExploreSectionFromTask(appStore, task);
        const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
        const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
        return toSelectorTaskWithoutRelatedEntities(locale, task, exploreSectionForTask, isRecommended);
    };

    return R.map(buildTask, matchingTasks);
};

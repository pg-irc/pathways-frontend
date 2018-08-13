import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { Task } from './task';
import { toSelectorTaskWithoutRelatedEntities } from './to_selector_task_without_related_entities';
import { filterTasksByTaxonomyTerms, rejectTasksWithIdsInList, rejectCompletedTasks } from '.';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';

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
        return toSelectorTaskWithoutRelatedEntities(locale, task, exploreSection, isRecommended);
    };

    return R.map(buildSelectorTask, nonCompletedTasks);
};

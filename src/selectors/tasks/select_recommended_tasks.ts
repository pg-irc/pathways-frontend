import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectLocale } from '../locale/select_locale';
import { Task } from './task';
import { toSelectorTaskWithoutRelatedEntities } from './to_selector_task_without_related_entities';
import { rejectTasksWithIdsInList } from './reject_tasks_with_ids_in_list';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { filterTasksByTaxonomyTerms } from './filter_tasks_by_taxonomy_terms';
import { rejectCompletedTasks } from './reject_completed_tasks';
import { pickSavedTaskIds } from './pick_saved_task_ids';
import { pickTasks } from './pick_tasks';
import { getTaxonomyTermsForChosenAnswers } from '../taxonomies/get_taxonomy_terms_for_chosen_answers';
import { AnswersMap } from '../../stores/questionnaire';
import { Id } from '../../stores/tasks';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectRecommendedTasks = (appStore: Store): ReadonlyArray<Task> => {
    const recommendedTasks = computeRecommendedTasks(pickAnswers(appStore), pickTasks(appStore), pickSavedTaskIds(appStore));
    return R.map(buildSelectorTask(appStore), recommendedTasks);
};

const computeRecommendedTasks = (answers: AnswersMap, tasks: store.TaskMap, savedTaskIds: ReadonlyArray<Id>): ReadonlyArray<store.Task> => (
    rejectSavedAndCompletedTasks(savedTaskIds, getRecommendedTasksFromSelectedAnswers(answers, tasks))
);

const getRecommendedTasksFromSelectedAnswers = (answers: AnswersMap, tasks: store.TaskMap): ReadonlyArray<store.Task> => (
    filterTasksByTaxonomyTerms(getTaxonomyTermsForChosenAnswers(answers), tasks)
);

const rejectSavedAndCompletedTasks = (savedTaskIds: ReadonlyArray<Id>, tasks: ReadonlyArray<store.Task>): ReadonlyArray<store.Task> => (
    rejectCompletedTasks(rejectTasksWithIdsInList(savedTaskIds, tasks))
);

const buildSelectorTask = R.curry((appStore: Store, task: store.Task): Task => {
    const locale = selectLocale(appStore);
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    const isRecommended = true;
    return toSelectorTaskWithoutRelatedEntities(locale, task, exploreSection, isRecommended);
});

import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTaskListItem } from './to_selector_task_list_item';
import { TaskListItem } from './task_list_item';
import { isTaskRecommended } from './is_task_recommended';
import { pickTasks } from './pick_tasks';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';

export const buildSelectorTaskListItem = R.curry((appStore: Store, taskId: store.Id): TaskListItem => {
    const locale = selectLocale(appStore);
    const taskMap = pickTasks(appStore);
    const task = taskMap[taskId];
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
    const isRecommended = isTaskRecommended(relevantTaxonomies, termsFromQuestionnaire, task);
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    return toSelectorTaskListItem(locale, task, isRecommended, exploreSection);
});

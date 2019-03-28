import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/topics';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTask } from './to_selector_task';
import { Task } from './task';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { isTaskRecommended } from './is_task_recommended';
import { selectRelatedTasks } from './select_related_tasks';
import { pickTasks } from './pick_tasks';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectCurrentTask = (appStore: Store, taskId: TaskId): Task => {
    const locale = selectLocale(appStore);
    const taskMap = pickTasks(appStore);
    const task = taskMap[taskId];
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
    const isRecommended = isTaskRecommended(relevantTaxonomies, termsFromQuestionnaire, task);
    const relatedTasks = selectRelatedTasks(appStore, task.relatedTopics);
    return toSelectorTask(locale, task, exploreSection, isRecommended, relatedTasks);
};

import { Store } from '../../stores';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { RouterProps } from '../../application/routing';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTask } from './to_selector_task';
import { Task } from './task';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { isTaskRecommended } from './is_task_recommended';
import { selectRelatedTasks } from './select_related_tasks';
import { pickTasks } from './pick_tasks';

export const selectCurrentTask = (appStore: Store, routerProps: RouterProps): Task => {
    const locale = selectLocale(appStore);
    const taskId = routerProps.match.params.taskId;
    const taskMap = pickTasks(appStore);
    const task = taskMap[taskId];
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
    const relatedTasks = selectRelatedTasks(appStore, task.relatedTasks);
    return toSelectorTask(locale, task, exploreSection, isRecommended, relatedTasks);
};

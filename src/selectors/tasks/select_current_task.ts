import { Location } from 'history';
import { Store } from '../../stores';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTask } from './to_selector_task';
import { Task } from './task';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { isTaskRecommended } from './is_task_recommended';
import { selectRelatedTasks } from './select_related_tasks';
import { pickTasks } from './pick_tasks';
import { Routes, getMatchParamsFromPathAndRoute } from '../../application/routing';

export const selectCurrentTask = (appStore: Store, location: Location): Task => {
    const locale = selectLocale(appStore);
    const taskMap = pickTasks(appStore);
    const matchParams = getMatchParamsFromPathAndRoute(location.pathname, Routes.TaskDetail);
    const task = taskMap[matchParams.taskId];
    const exploreSection = selectExploreSectionFromTask(appStore, task);
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
    const relatedTasks = selectRelatedTasks(appStore, task.relatedTasks);
    return toSelectorTask(locale, task, exploreSection, isRecommended, relatedTasks);
};

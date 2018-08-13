import { Store } from '../../stores';
import * as store from '../../stores/tasks';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTaskListItem } from './to_selector_task_list_item';
import { TaskListItem } from './task_list_item';
import { isTaskRecommended } from '.';

export const selectTaskAsListItem = (appStore: Store, taskId: store.Id): TaskListItem => {
    const locale = selectLocale(appStore);
    const taskMap = appStore.tasksInStore.taskMap;
    const task = taskMap[taskId];
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const isRecommended = isTaskRecommended(termsFromQuestionnaire, task);
    return toSelectorTaskListItem(locale, task, isRecommended);
};

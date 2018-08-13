import { Store } from '../../stores';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { RouterProps } from '../../application/routing';
import { toSelectorArticleList } from '../articles/to_selector_article_list';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTask } from './to_selector_task';
import { Task } from './task';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { isTaskRecommended } from './is_task_recommended';
import { selectRelatedTasks } from '.';

export const selectCurrentTask = (appStore: Store, routerProps: RouterProps): Task => {
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

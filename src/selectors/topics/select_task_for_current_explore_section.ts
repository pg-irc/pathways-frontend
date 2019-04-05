import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { RouterProps } from '../../application/routing';
import { selectLocale } from '../locale/select_locale';
import { findItemsByExploreTaxonomyTerm } from '../taxonomies/find_items_by_explore_taxonomy_term';
import { Topic } from './topic';
import { toSelectorTaskWithoutRelatedEntities } from './to_selector_task_without_related_entities';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';
import { isTaskRecommended } from './is_task_recommended';
import { pickExploreSectionById } from '../explore/pick_explore_section_by_id';
import { pickTasks } from './pick_tasks';
import { sortTaskList } from './sort_task_list';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectTaskForCurrentExploreSection = (appStore: Store, routerProps: RouterProps): ReadonlyArray<Topic> => {
    const currentExploreSection = pickExploreSectionById(appStore, routerProps.match.params.learnId);
    const tasks = pickTasks(appStore);
    const matchingTasks = findItemsByExploreTaxonomyTerm(currentExploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(appStore);

    const buildTask = (topic: store.Topic): Topic => {
        const exploreSectionForTask = selectExploreSectionFromTask(appStore, topic);
        const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
        const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
        const isRecommended = isTaskRecommended(relevantTaxonomies, termsFromQuestionnaire, topic);
        return toSelectorTaskWithoutRelatedEntities(locale, topic, exploreSectionForTask, isRecommended);
    };

    return sortTaskList(R.map(buildTask, matchingTasks));
};

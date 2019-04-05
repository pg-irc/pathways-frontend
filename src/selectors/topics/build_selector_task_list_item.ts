import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTaskListItem } from './to_selector_task_list_item';
import { TopicListItem } from './topic_list_item';
import { isTaskRecommended } from './is_task_recommended';
import { pickTasks } from './pick_tasks';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectExploreSectionFromTask } from './select_explore_section_from_task';

export const buildSelectorTaskListItem = R.curry((appStore: Store, topicId: store.Id): TopicListItem => {
    const locale = selectLocale(appStore);
    const topicMap = pickTasks(appStore);
    const topic = topicMap[topicId];
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
    const isRecommended = isTaskRecommended(relevantTaxonomies, termsFromQuestionnaire, topic);
    const exploreSection = selectExploreSectionFromTask(appStore, topic);
    return toSelectorTaskListItem(locale, topic, isRecommended, exploreSection);
});

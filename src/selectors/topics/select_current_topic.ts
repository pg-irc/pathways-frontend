import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/topics';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTopic } from './to_selector_topic';
import { Topic } from './topic';
import { selectExploreSectionFromTopic } from './select_explore_section_from_topic';
import { isTaskRecommended } from './is_task_recommended';
import { selectRelatedTopics } from './select_related_topics';
import { pickTasks } from './pick_tasks';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectCurrentTopic = (appStore: Store, topicId: TaskId): Topic => {
    const locale = selectLocale(appStore);
    const topicMap = pickTasks(appStore);
    const topic = topicMap[topicId];
    const exploreSection = selectExploreSectionFromTopic(appStore, topic);
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
    const isRecommended = isTaskRecommended(relevantTaxonomies, termsFromQuestionnaire, topic);
    const relatedTasks = selectRelatedTopics(appStore, topic.relatedTopics);
    return toSelectorTopic(locale, topic, exploreSection, isRecommended, relatedTasks);
};

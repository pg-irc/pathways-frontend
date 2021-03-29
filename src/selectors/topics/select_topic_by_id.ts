import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/topics';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTopic } from './to_selector_topic';
import { Topic } from './types';
import { selectExploreSectionFromTopic } from './select_explore_section_from_topic';
import { isTopicRecommended } from './is_topic_recommended';
import { selectRelatedTopics } from './select_related_topics';
import { selectTopicsForCurrentRegion } from './select_topics_for_current_region';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectTopicById = (appStore: Store, topicId: TaskId): Topic => {
    const locale = selectLocale(appStore);
    const topicMap = selectTopicsForCurrentRegion(appStore);
    const topic = topicMap[topicId];
    const exploreSection = selectExploreSectionFromTopic(appStore, topic);
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
    const isRecommended = isTopicRecommended(relevantTaxonomies, termsFromQuestionnaire, topic);
    const relatedTasks = selectRelatedTopics(appStore, topic.relatedTopics);
    return toSelectorTopic(locale, topic, exploreSection, isRecommended, relatedTasks);
};

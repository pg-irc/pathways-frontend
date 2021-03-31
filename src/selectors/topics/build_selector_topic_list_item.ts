import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { selectLocale } from '../locale/select_locale';
import { toSelectorTopicListItem } from './to_selector_topic_list_item';
import { TopicListItem } from './types';
import { isTopicRecommended } from './is_topic_recommended';
import { selectTopicsForCurrentRegion } from './select_topics_for_current_region';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';
import { selectExploreSectionFromTopic } from './select_explore_section_from_topic';

export const buildSelectorTopicListItem = R.curry((appStore: Store, topicId: store.Id): TopicListItem => {
    const locale = selectLocale(appStore);
    const topicMap = selectTopicsForCurrentRegion(appStore);
    const topic = topicMap[topicId];
    const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
    const isRecommended = isTopicRecommended(relevantTaxonomies, termsFromQuestionnaire, topic);
    const exploreSection = selectExploreSectionFromTopic(appStore, topic);
    return toSelectorTopicListItem(locale, topic, isRecommended, exploreSection);
});

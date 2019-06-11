import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { selectTaxonomyTermsForChosenAnswers } from '../taxonomies/select_taxonomy_terms_for_chosen_answers';
import { RouterProps } from '../../application/routing';
import { selectLocale } from '../locale/select_locale';
import { findItemsByExploreTaxonomyTerm } from '../taxonomies/find_items_by_explore_taxonomy_term';
import { Topic } from './topic';
import { toSelectorTopicWithoutRelatedEntities } from './to_selector_topic_without_related_entities';
import { selectExploreSectionFromTopic } from './select_explore_section_from_topic';
import { isTopicRecommended } from './is_topic_recommended';
import { pickExploreSectionById } from '../explore/pick_explore_section_by_id';
import { pickTopics } from './pick_topics';
import { sortTopicList } from './sort_topic_list';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { pickAnswers } from '../questionnaire/pick_answers';

export const selectTopicForCurrentExploreSection = (appStore: Store, routerProps: RouterProps): ReadonlyArray<Topic> => {
    const currentExploreSection = pickExploreSectionById(appStore, routerProps.match.params.learnId);
    const tasks = pickTopics(appStore);
    const matchingTasks = findItemsByExploreTaxonomyTerm(currentExploreSection.taxonomyTerms, tasks);

    const locale = selectLocale(appStore);

    const buildTask = (topic: store.Topic): Topic => {
        const exploreSectionForTask = selectExploreSectionFromTopic(appStore, topic);
        const termsFromQuestionnaire = selectTaxonomyTermsForChosenAnswers(appStore);
        const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(pickAnswers(appStore));
        const isRecommended = isTopicRecommended(relevantTaxonomies, termsFromQuestionnaire, topic);
        return toSelectorTopicWithoutRelatedEntities(locale, topic, exploreSectionForTask, isRecommended);
    };

    return sortTopicList(R.map(buildTask, matchingTasks));
};

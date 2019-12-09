import { AnswersMap } from '../../stores/questionnaire';
import { TopicMap, Topic } from '../../stores/topics';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { getTaxonomyTermsForRelevantAnswers } from '../taxonomies/get_taxonomy_terms_for_relevant_answers';
import { isTopicRecommended } from './is_topic_recommended';
import * as R from 'ramda';

export const getRecommendedTopics = (answers: AnswersMap, topics: TopicMap): ReadonlyArray<Topic> => {
    const chosenTaxonomyTerms = getTaxonomyTermsForRelevantAnswers(answers);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(answers);
    const isRecommended = isTopicRecommended(relevantTaxonomies, chosenTaxonomyTerms);

    return R.filter(isRecommended, R.values(topics));
};

import { AnswersMap } from '../../stores/questionnaire';
import { TopicMap, Topic } from '../../stores/topics';
import { getAllTaxonomyIdsFromAnswers } from '../questionnaire/get_all_taxonomy_ids_from_questionnaire';
import { getTaxonomyTermsForRelevantAnswers } from '../taxonomies/get_taxonomy_terms_for_relevant_answers';
import { isTaskRecommended } from './is_task_recommended';
import { isCompleted } from './is_completed';
import * as R from 'ramda';

export const getRecommendedTasks = (answers: AnswersMap, topics: TopicMap): ReadonlyArray<Topic> => {
    const chosenTaxonomyTerms = getTaxonomyTermsForRelevantAnswers(answers);
    const relevantTaxonomies = getAllTaxonomyIdsFromAnswers(answers);
    const isRecommended = isTaskRecommended(relevantTaxonomies, chosenTaxonomyTerms);

    const isInRecommendedList = (topic: Topic): boolean => (
        R.not(isCompleted(topic)) && isRecommended(topic)
    );

    return R.filter(isInRecommendedList, R.values(topics));
};

import { Task } from '../../stores/topics';
import { Taxonomies } from '../../application/constants';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import * as R from 'ramda';

const recommendedToAll: TaxonomyTermReference = {
    taxonomyId: Taxonomies.RECOMMENDATION_TAXONOMY_ID,
    taxonomyTermId: Taxonomies.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID,
};

export const isTaskRecommendedToAll = (task: Task): boolean => (
    R.any(R.equals(recommendedToAll), task.taxonomyTerms)
);

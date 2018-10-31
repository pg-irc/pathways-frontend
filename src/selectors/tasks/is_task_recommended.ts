import { Task } from '../../stores/tasks';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { Taxonomies } from '../../application/constants';
import * as R from 'ramda';

export const isTaskRecommended = R.curry((taxonomyTerms: ReadonlyArray<TaxonomyTermReference>, task: Task): boolean => {
    const taxonomyId = Taxonomies.RECOMMENDATION_TAXONOMY_ID;
    const taxonomyTermId = Taxonomies.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;

    const taxonomyTermsWithDefault = R.append({ taxonomyId, taxonomyTermId }, taxonomyTerms);

    return R.not(R.isEmpty(R.intersection(taxonomyTermsWithDefault, task.taxonomyTerms)));
});

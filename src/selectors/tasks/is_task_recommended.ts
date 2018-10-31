import { Task } from '../../stores/tasks';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { Taxonomies as TaxonomyConstants } from '../../application/constants';
import * as R from 'ramda';

export const isTaskRecommended = R.curry((selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, task: Task): boolean => {
    const taskContainsTaxonomyTerms = R.curry((targetTerms: ReadonlyArray<TaxonomyTermReference>, aTask: Task): boolean => (
        R.not(R.isEmpty(R.intersection(targetTerms, aTask.taxonomyTerms)))
    ));

    const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
    const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;

    const isRecommendedToAll = taskContainsTaxonomyTerms([{ taxonomyId, taxonomyTermId }]);
    const isRecommendedBecauseOfSelecedAnswers = taskContainsTaxonomyTerms(selectedAnswerTaxonomyTerms);

    return isRecommendedToAll(task) || isRecommendedBecauseOfSelecedAnswers(task);
});

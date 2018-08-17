import * as R from 'ramda';
import * as store from '../../stores/tasks';
import { Taxonomies as TaxonomyConstants } from '../../application/constants';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';

export const filterTasksByTaxonomyTerms =
    R.curry((selectedAnswerTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, taskMap: store.TaskMap): ReadonlyArray<store.Task> => {

        const taskContainsTaxonomyTerms = R.curry((targetTerms: ReadonlyArray<TaxonomyTermReference>, task: store.Task): boolean => (
            R.not(R.isEmpty(R.intersection(targetTerms, task.taxonomyTerms)))
        ));

        const taxonomyId = TaxonomyConstants.RECOMMENDATION_TAXONOMY_ID;
        const taxonomyTermId = TaxonomyConstants.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID;

        const isRecommendedToAll = taskContainsTaxonomyTerms([{ taxonomyId, taxonomyTermId }]);
        const isRecommendedBecauseOfSelecedAnswers = taskContainsTaxonomyTerms(selectedAnswerTaxonomyTerms);

        const isRecommended = R.either(isRecommendedToAll, isRecommendedBecauseOfSelecedAnswers);

        return R.filter(isRecommended, R.values(taskMap));
    });

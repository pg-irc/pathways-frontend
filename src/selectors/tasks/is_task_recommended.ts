import { Task } from '../../stores/tasks';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { Taxonomies } from '../../application/constants';
import * as R from 'ramda';

export const isTaskRecommended = R.curry((chosenTaxonomyTerms: ReadonlyArray<TaxonomyTermReference>, task: Task): boolean => {
    if (isRecommendedToAll(task)) {
        return true;
    }

    const groupedTermsFromTask = R.values(R.reduce(groupTermsByTaxonomy, {}, task.taxonomyTerms));

    if (R.isEmpty(chosenTaxonomyTerms) || R.isEmpty(groupedTermsFromTask)) {
        return false;
    }

    return R.all(atLeastOneTermsMatches(chosenTaxonomyTerms), groupedTermsFromTask);
});

const isRecommendedToAll = (task: Task): boolean => (
    R.any(matchesRecommendedToAll, task.taxonomyTerms)
);

const matchesRecommendedToAll = (term: TaxonomyTermReference): boolean => (
    term.taxonomyId === Taxonomies.RECOMMENDATION_TAXONOMY_ID &&
    term.taxonomyTermId === Taxonomies.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID
);

interface GroupedTerms {
    readonly [taxonomyId: string]: ReadonlyArray<TaxonomyTermReference>;
}

const groupTermsByTaxonomy = (accumulator: GroupedTerms, element: TaxonomyTermReference): GroupedTerms => {
    const taxonomyId = element.taxonomyId;
    const group = accumulator[taxonomyId] || [];
    return {
        ...accumulator,
        [taxonomyId]: [...group, element],
    };
};

const atLeastOneTermsMatches = R.curry((t1: ReadonlyArray<TaxonomyTermReference>, t2: ReadonlyArray<TaxonomyTermReference>): boolean => (
    R.intersection(t2, t1) !== []
));

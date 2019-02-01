import { Task } from '../../stores/tasks';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { Taxonomies } from '../../application/constants';
import * as R from 'ramda';

type Term = TaxonomyTermReference;

export const isTaskRecommended =
    R.curry((termsFromQuestionnaire: ReadonlyArray<Term>, task: Task): boolean => {

        if (isTaskRecommendedToAll(task)) {
            return true;
        }

        const groupedTermsFromTask = groupTermsByTaxonomy(task.taxonomyTerms);

        if (R.isEmpty(groupedTermsFromTask)) {
            return false;
        }

        return R.all(atLeastOneTermMatches(termsFromQuestionnaire), groupedTermsFromTask);
    });

const recommendedToAllTerm: Term = {
    taxonomyId: Taxonomies.RECOMMENDATION_TAXONOMY_ID,
    taxonomyTermId: Taxonomies.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID,
};

const isTaskRecommendedToAll = (task: Task): boolean => (
    R.any(R.equals(recommendedToAllTerm), task.taxonomyTerms)
);

const groupTermsByTaxonomy = (terms: ReadonlyArray<Term>): ReadonlyArray<ReadonlyArray<Term>> => (
    R.values(R.reduce(addToMapByTaxonomy, {}, terms))
);

interface GroupedTerms {
    readonly [taxonomyId: string]: ReadonlyArray<Term>;
}

const addToMapByTaxonomy = (accumulator: GroupedTerms, element: Term): GroupedTerms => {
    const taxonomyId = element.taxonomyId;
    const group = accumulator[taxonomyId] || [];
    return {
        ...accumulator,
        [taxonomyId]: [...group, element],
    };
};

const atLeastOneTermMatches = R.curry((left: ReadonlyArray<Term>, right: ReadonlyArray<Term>): boolean => (
    R.not(R.isEmpty(R.intersection(left, right)))
));

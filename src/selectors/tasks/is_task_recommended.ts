import { Task } from '../../stores/tasks';
import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { Taxonomies } from '../../application/constants';
import * as R from 'ramda';

type Term = TaxonomyTermReference;
type TermList = ReadonlyArray<Term>;

export const isTaskRecommended = R.curry((termsFromQuestionnaire: TermList, task: Task): boolean => {
    if (isTaskRecommendedToAll(task)) {
        return true;
    }

    const groupedTermsFromTask = groupTermsByTaxonomy(task.taxonomyTerms);

    if (R.isEmpty(groupedTermsFromTask)) {
        return false;
    }

    return R.all(atLeastOneTermMatches(termsFromQuestionnaire), groupedTermsFromTask);
});

const recommendedToAll: Term = {
    taxonomyId: Taxonomies.RECOMMENDATION_TAXONOMY_ID,
    taxonomyTermId: Taxonomies.RECOMMEND_TO_ALL_TAXONOMY_TERM_ID,
};

const isTaskRecommendedToAll = (task: Task): boolean => (
    R.any(R.equals(recommendedToAll), task.taxonomyTerms)
);

const groupTermsByTaxonomy = (terms: TermList): ReadonlyArray<TermList> => (
    R.values(R.reduce(addTermToMapByTaxonomy, {}, terms))
);

interface GroupedTerms {
    readonly [taxonomyId: string]: TermList;
}

const addTermToMapByTaxonomy = (accumulator: GroupedTerms, element: Term): GroupedTerms => {
    const taxonomyId = element.taxonomyId;
    const group = accumulator[taxonomyId] || [];
    return {
        ...accumulator,
        [taxonomyId]: [...group, element],
    };
};

const atLeastOneTermMatches = R.curry((left: TermList, right: TermList): boolean => (
    R.not(R.isEmpty(R.intersection(left, right)))
));

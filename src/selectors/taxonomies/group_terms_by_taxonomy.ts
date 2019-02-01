import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import * as R from 'ramda';

type Term = TaxonomyTermReference;
type TermList = ReadonlyArray<Term>;

export const groupTermsByTaxonomy = (terms: TermList): ReadonlyArray<TermList> => (
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

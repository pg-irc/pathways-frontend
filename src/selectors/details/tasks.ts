import { TaxonomyTermReference } from '../../stores/taxonomies';
import { getExploreTaxonomyTerms } from '../taxonomies';
import * as R from 'ramda';

export interface HasTaxonomyTerms {
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
}

export interface MapOfHasTaxonomyTerms<T extends HasTaxonomyTerms> {
    readonly [property: string]: T;
}

export function findItemByLearnTaxonomyTerm<T extends HasTaxonomyTerms>(needle: ReadonlyArray<TaxonomyTermReference>,
    haystack: MapOfHasTaxonomyTerms<T>): ReadonlyArray<T> {

    const needleTerms = getExploreTaxonomyTerms(needle);

    const matchesTaxonomyTerm = (item: T): boolean => {
        const haystackTerms = getExploreTaxonomyTerms(item.taxonomyTerms);
        const commonTerms = R.intersection(needleTerms, haystackTerms);
        return R.length(commonTerms) > 0;
    };

    const find = R.compose(R.values, R.pickBy(matchesTaxonomyTerm));

    return find(haystack);
}

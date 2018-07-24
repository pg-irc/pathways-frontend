import { TaxonomyTermReference } from '../../stores/taxonomies';
import { getExploreTaxonomyTerms } from '../taxonomies';
import * as R from 'ramda';

export interface HasTaxonomyTerms {
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
}

export interface MapOfHasTaxonomyTerms<T extends HasTaxonomyTerms> {
    readonly [property: string]: T;
}

export function findTasksByExploreTaxonomyTerm<T extends HasTaxonomyTerms>(needle: ReadonlyArray<TaxonomyTermReference>,
    haystack: MapOfHasTaxonomyTerms<T>): ReadonlyArray<T> {

    const needleTerms = getExploreTaxonomyTerms(needle);

    const matchesTaxonomyTerm = (task: T): boolean => {
        const haystackTerms = getExploreTaxonomyTerms(task.taxonomyTerms);
        const commonTerms = R.intersection(needleTerms, haystackTerms);
        return R.length(commonTerms) > 0;
    };

    const findTasks = R.compose(R.values, R.pickBy(matchesTaxonomyTerm));

    return findTasks(haystack);
}

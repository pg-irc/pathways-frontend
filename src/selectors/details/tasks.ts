import { TaxonomyTermReference } from '../../stores/taxonomies';
import { filterExploreTaxonomyTerms } from '../taxonomies/filter_explore_taxonomy_terms';
import { ExploreSectionMap, ExploreSection } from '../../stores/explore';
import * as R from 'ramda';

export interface HasTaxonomyTerms {
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
}

export interface MapOfHasTaxonomyTerms<T extends HasTaxonomyTerms> {
    readonly [property: string]: T;
}

export function findItemByLearnTaxonomyTerm<T extends HasTaxonomyTerms>(needle: ReadonlyArray<TaxonomyTermReference>,
    haystack: MapOfHasTaxonomyTerms<T>): ReadonlyArray<T> {

    const needleTerms = filterExploreTaxonomyTerms(needle);

    const matchesTaxonomyTerm = (item: T): boolean => {
        const haystackTerms = filterExploreTaxonomyTerms(item.taxonomyTerms);
        const commonTerms = R.intersection(needleTerms, haystackTerms);
        return R.length(commonTerms) > 0;
    };

    const find = R.compose(R.values, R.pickBy(matchesTaxonomyTerm));

    return find(haystack);
}

export function findExploreSectionBy<T extends HasTaxonomyTerms>(needle: T,
    haystack: ExploreSectionMap): ExploreSection | undefined {

    const needleTerms = filterExploreTaxonomyTerms(needle.taxonomyTerms);

    const matchesTaxonomyTerm = (section: ExploreSection): boolean => {
        const haystackTerms = filterExploreTaxonomyTerms(section.taxonomyTerms);
        const commonTerms = R.intersection(needleTerms, haystackTerms);
        return R.length(commonTerms) > 0;
    };

    const find = R.compose(R.values, R.pickBy(matchesTaxonomyTerm));
    const found = find(haystack);

    if (R.isEmpty(found)) {
        return undefined;
    }

    return R.head(found);
}

import { filterExploreTaxonomyTerms } from '../taxonomies/filter_explore_taxonomy_terms';
import { ExploreSectionMap, ExploreSection } from '../../stores/explore';
import { HasTaxonomyTerms } from '../taxonomies/find_items_by_explore_taxonomy_term';
import * as R from 'ramda';

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

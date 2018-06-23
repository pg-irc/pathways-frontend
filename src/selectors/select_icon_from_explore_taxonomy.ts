import { Taxonomy, TaxonomyTermReference, ExploreTaxonomyId } from '../stores/taxonomies';
import * as R from 'ramda';

export const selectIconFromExploreTaxonomy =
    (taxonomyTerms: ReadonlyArray<TaxonomyTermReference>, exploreTaxonomy: Taxonomy): string => {
        const findExploreTaxonomyTerm = R.find<TaxonomyTermReference>(R.propEq('taxonomyId', ExploreTaxonomyId));
        const found = findExploreTaxonomyTerm(taxonomyTerms);
        return found ? exploreTaxonomy[found.taxonomyTermId].icon : undefined;
    };

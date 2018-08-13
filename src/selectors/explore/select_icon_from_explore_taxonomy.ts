// tslint:disable:no-expression-statement
import { Taxonomy, TaxonomyTermReference, ExploreTaxonomyId } from '../../stores/taxonomies';
import * as R from 'ramda';

// TODO change this to take the whole store as argument instead of exploreTaxonomy
export const selectIconFromExploreTaxonomy =
    (taxonomyTerms: ReadonlyArray<TaxonomyTermReference>, exploreTaxonomy: Taxonomy): string => {
        const fallback = 'help-circle';
        const findExploreTaxonomyTerm = R.find<TaxonomyTermReference>(R.propEq('taxonomyId', ExploreTaxonomyId));

        const found = findExploreTaxonomyTerm(taxonomyTerms);
        if (!found) {
            return fallback;
        }

        const taxonomyTerm = exploreTaxonomy[found.taxonomyTermId];
        if (!taxonomyTerm) {
            return fallback;
        }

        const icon = taxonomyTerm.icon;
        if (!icon) {
            return fallback;
        }

        return icon;
    };

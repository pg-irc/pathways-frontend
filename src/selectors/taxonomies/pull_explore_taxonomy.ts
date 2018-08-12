import { Store } from '../../stores';
import { Taxonomy, ExploreTaxonomyId } from '../../stores/taxonomies';
import * as R from 'ramda';

export { TaxonomyTermReference } from '../../stores/taxonomies';

export const pullExploreTaxonomy = (store: Store): Taxonomy => (
    store.taxonomiesInStore.taxonomyMap[ExploreTaxonomyId]
);

export const getExploreTaxonomyTerms = R.filter(R.propEq('taxonomyId', ExploreTaxonomyId));

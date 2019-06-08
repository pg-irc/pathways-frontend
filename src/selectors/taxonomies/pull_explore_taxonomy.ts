import { Store } from '../../stores';
import { Taxonomy, ExploreTaxonomyId } from '../../stores/taxonomies';

export { TaxonomyTermReference } from '../../stores/taxonomies';

export const pullExploreTaxonomy = (store: Store): Taxonomy => (
    store.taxonomies.taxonomyMap[ExploreTaxonomyId]
);

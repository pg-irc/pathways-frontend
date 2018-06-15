import { Taxonomy, ExploreTaxonomyId } from '../stores/taxonomies';
import * as app from '../application/store';

export { TaxonomyTermReference } from '../stores/taxonomies';

export const selectExploreTaxonomy = (store: app.Store): Taxonomy => (
    store.applicationState.taxonomiesInStore.taxonomyMap[ExploreTaxonomyId]
);

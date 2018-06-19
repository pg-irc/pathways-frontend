import { Taxonomy, ExploreTaxonomyId } from '../stores/taxonomies';
import * as app from '../application/store';
import * as R from 'ramda';

export { TaxonomyTermReference } from '../stores/taxonomies';

export const selectExploreTaxonomy = (store: app.Store): Taxonomy => (
    store.applicationState.taxonomiesInStore.taxonomyMap[ExploreTaxonomyId]
);

// TODO take taxonomy id as argument, don't assume one return value
export const getExploreTaxonomyTerms = R.filter(R.propEq('taxonomyId', ExploreTaxonomyId));

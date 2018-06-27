import { buildTaxonomyFixture } from '../fixtures/hard_coded/taxonomies';
import { Store } from '../fixtures/types/taxonomies';
export { Store, TaxonomyTermReference, Taxonomy, ExploreTaxonomyId } from '../fixtures/types/taxonomies';

export type Id = string;

const buildDefaultStore = (): Store => (
    buildTaxonomyFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: Store = buildDefaultStore(), _?: any): Store => {
    return store;
};

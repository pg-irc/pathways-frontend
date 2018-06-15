import { buildTaxonomyFixture, Store } from '../fixtures/taxonomies';
export { Store, TaxonomyTermReference } from '../fixtures/taxonomies';

export type Id = string;

const buildDefaultStore = (): Store => (
    buildTaxonomyFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: Store = buildDefaultStore(), _?: any): Store => {
    return store;
};

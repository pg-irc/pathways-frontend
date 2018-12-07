import { buildTaxonomyFixture } from '../fixtures/buildFixtures';
import { TaxonomyStore } from '../fixtures/types/taxonomies';
export { TaxonomyStore, TaxonomyTermReference, Taxonomy, ExploreTaxonomyId } from '../fixtures/types/taxonomies';

export type Id = string;

export const buildDefaultStore = (): TaxonomyStore => (
    buildTaxonomyFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: TaxonomyStore = buildDefaultStore(), _?: any): TaxonomyStore => {
    return store;
};

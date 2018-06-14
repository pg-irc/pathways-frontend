import { buildExploreFixture, Store } from '../fixtures/explore';
export { Store, ExploreSection, ExploreSectionMap } from '../fixtures/explore';

export type Id = string;

const buildDefaultStore = (): Store => (
    buildExploreFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: Store = buildDefaultStore(), _?: any): Store => {
    return store;
};

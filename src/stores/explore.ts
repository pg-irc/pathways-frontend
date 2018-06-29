import { buildExploreFixture } from '../fixtures/buildFixtures';
import { Store } from '../fixtures/types/explore';

export { Store, ExploreSection, ExploreSectionMap } from '../fixtures/types/explore';

export type Id = string;

const buildDefaultStore = (): Store => (
    buildExploreFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: Store = buildDefaultStore(), _?: any): Store => {
    return store;
};

import { buildExploreFixture } from '../fixtures/buildFixtures';
import { ExploreStore } from '../fixtures/types/explore';

export { ExploreStore, ExploreSection, ExploreSectionMap } from '../fixtures/types/explore';

export type Id = string;

const buildDefaultStore = (): ExploreStore => (
    buildExploreFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: ExploreStore = buildDefaultStore(), _?: any): ExploreStore => {
    return store;
};

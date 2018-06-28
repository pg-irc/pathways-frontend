import { buildArticlesFixture } from '../fixtures/buildFixtures';
import { Store } from '../fixtures/types/articles';

export { Article, Id, Store } from '../fixtures/types/articles';

export const buildDefaultStore = (): Store => (
    buildArticlesFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: Store = buildDefaultStore(), _?: any): Store => {
    return store;
};

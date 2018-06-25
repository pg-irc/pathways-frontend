import { buildArticlesFixture, Store } from '../fixtures/articles';

export { Id, Store, Article, ArticleMap }  from '../fixtures/articles';

export const buildDefaultStore = (): Store => (
    buildArticlesFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: Store = buildDefaultStore(), _?: any): Store => {
    return store;
};
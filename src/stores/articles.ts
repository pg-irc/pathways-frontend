import { buildArticlesFixture } from '../fixtures/buildFixtures';
import { ArticleStore } from '../fixtures/types/articles';

export { Article, Id, ArticleStore } from '../fixtures/types/articles';

export const buildDefaultStore = (): ArticleStore => (
    buildArticlesFixture()
);

// tslint:disable-next-line:no-any
export const reducer = (store: ArticleStore = buildDefaultStore(), _?: any): ArticleStore => {
    return store;
};

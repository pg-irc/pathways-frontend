import * as model from '../../stores/articles';
import { Store } from '../../stores';

export const pickArticleById = (store: Store, articleId: model.Id): model.Article => (
    store.articlesInStore.articles[articleId]
);

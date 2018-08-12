import { Store } from '../../stores';
import * as model from '../../stores/articles';
import * as R from 'ramda';
import { selectLocale } from '../locale/select_locale';
import { toSelectorArticleListItem } from './to_selector_article_list_item';
import { ArticleListItem } from './types';

export const toSelectorArticleList = (store: Store, articleIds: ReadonlyArray<model.Id>): ReadonlyArray<ArticleListItem> => {
    const selectArticleAsListItem = (articleId: model.Id): ArticleListItem => {
        const locale = selectLocale(store);
        const articles = store.articlesInStore.articles;
        const article = articles[articleId];
        return toSelectorArticleListItem(locale, article);
    };

    return R.map((id: model.Id) => selectArticleAsListItem(id), articleIds);
};

import { Store } from '../../stores';
import * as model from '../../stores/articles';
import * as R from 'ramda';
import { selectLocale } from '../locale/select_locale';
import { toSelectorArticleListItem } from './to_selector_article_list_item';
import { ArticleListItem } from './article_list_item';
import { pickArticleById } from './pick_article_by_id';

// TODO pass in article list and locale, not store
export const toSelectorArticleList = (store: Store, articleIds: ReadonlyArray<model.Id>): ReadonlyArray<ArticleListItem> => {
    const locale = selectLocale(store);

    const toListItem = (articleId: model.Id): ArticleListItem => (
        toSelectorArticleListItem(locale, pickArticleById(store, articleId))
    );

    return R.map(toListItem, articleIds);
};

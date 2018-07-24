import { Store } from '../stores';
import * as model from '../stores/articles';
import * as R from 'ramda';
import { selectLocale, selectLocalizedText } from './locale';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import { TaskListItem, selectRelatedTasks } from './tasks';

export interface Article {
    readonly id: model.Id;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly starred: boolean;
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
}

export interface ArticleListItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
}

export const denormalizeArticle =
    (locale: Locale, article: model.Article, relatedArticles: ReadonlyArray<ArticleListItem>,
     relatedTasks: ReadonlyArray<TaskListItem>): Article => (
    {
        id: article.id,
        title: selectLocalizedText(locale, article.title),
        description: selectLocalizedText(locale, article.description),
        taxonomyTerms: article.taxonomyTerms,
        starred: article.starred,
        relatedArticles: relatedArticles,
        relatedTasks: relatedTasks,
    }
);

export const denormalizeArticleListItem = (locale: Locale, article: model.Article): ArticleListItem => (
        {
            id: article.id,
            title: selectLocalizedText(locale, article.title),
            description: selectLocalizedText(locale, article.description),
        }
    );

export const selectRelatedArticles = (store: Store, articleIds: ReadonlyArray<model.Id>): ReadonlyArray<ArticleListItem> => (
    R.map((id: model.Id) => selectArticleAsListItem(store, id), articleIds)
);

export const selectArticleAsListItem = (store: Store, articleId: model.Id): ArticleListItem => {
    const locale = selectLocale(store);
    const articles = store.articlesInStore.articles;
    const article = articles[articleId];
    return denormalizeArticleListItem(locale, article);
};

export const selectArticleByPathParameter = (store: Store, articleId: model.Id): Article => {
    const locale = selectLocale(store);
    const articles = store.articlesInStore.articles;
    const article = articles[articleId];
    const relatedTasks = selectRelatedTasks(store, article.relatedTasks);
    const relatedArticles = selectRelatedArticles(store, article.relatedArticles);
    return denormalizeArticle(locale, article, relatedArticles, relatedTasks);
};

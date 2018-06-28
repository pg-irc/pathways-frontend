import * as app from '../application/store';
import * as model from '../stores/articles';
import * as R from 'ramda';
import { selectLocale, selectLocalizedText } from './locale';
import { selectRoute } from './route';
import { Locale } from '../locale/types';
import { TaxonomyTermReference } from './taxonomies';
import { Task, selectRelatedTasks } from './tasks';

export interface Article {
    readonly id: model.Id;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly starred: boolean;
    readonly relatedArticles: ReadonlyArray<Article>;
    readonly relatedTasks: ReadonlyArray<Task>;
}

export const denormalizeArticle =
    (locale: Locale, article: model.Article, relatedArticles: ReadonlyArray<Article>, relatedTasks: ReadonlyArray<Task>): Article => (
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

export const selectCurrentArticle = (store: app.Store): Article => {
    const locale = selectLocale(store);
    const articles = store.applicationState.articlesInStore.articles;
    const articleId = selectRoute(store).pageId;
    const article = articles[articleId];
    const relatedTasks = article.relatedTasks ? selectRelatedTasks(store, article.relatedTasks) : undefined;
    const relatedArticles = article.relatedArticles ? selectRelatedArticles(store, article.relatedArticles) : undefined;
    return denormalizeArticle(locale, article, relatedArticles, relatedTasks);
};

export const selectRelatedArticles = (store: app.Store, articleIds: ReadonlyArray<model.Id>): ReadonlyArray<Article> => (
    R.map((id: model.Id) => selectArticleAsListItem(store, id), articleIds)
);

export const selectArticleAsListItem = (store: app.Store, articleId: model.Id): Article => {
    const locale = selectLocale(store);
    const articles = store.applicationState.articlesInStore.articles;
    const article = articles[articleId];
    return denormalizeArticle(locale, article, [], []);
};

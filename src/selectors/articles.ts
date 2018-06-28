import * as app from '../application/store';
import * as model from '../stores/articles';
import * as R from 'ramda';
import { selectLocale, selectLocalizedText } from './locale';
import { selectRoute } from './route';
import { Locale } from '../locale/types';
import { Task, selectTaskById } from './tasks';
import { Id as TaskId } from '../stores/tasks';

export interface Article {
    readonly id: model.Id;
    readonly name: string;
    readonly content: string;
    readonly isStarred: boolean;
    readonly relatedArticles: ReadonlyArray<Article>;
    readonly relatedTasks: ReadonlyArray<Task>;
}

export const denormalizeArticle =
    (locale: Locale, article: model.Article, relatedArticles: ReadonlyArray<Article>, relatedTasks: ReadonlyArray<Task>): Article => (
    {
        id: article.id,
        name: selectLocalizedText(locale, article.name),
        content: selectLocalizedText(locale, article.content),
        isStarred: article.isStarred,
        relatedArticles: relatedArticles,
        relatedTasks: relatedTasks,
    }
);

export const selectCurrentArticle = (store: app.Store): Article => {
    const locale = selectLocale(store);
    const articles = store.applicationState.articlesInStore.articles;
    const articleId = selectRoute(store).pageId;
    const article = findArticleById(articles, articleId);
    // TODO task selectors should take the whole store.
    const relatedTasks = article.relatedTasks ?
        R.map((id: TaskId) => selectTaskById(locale, store.applicationState.tasksInStore, id), article.relatedTasks) : undefined;
    const relatedArticles = article.relatedArticles ?
        R.map((id: model.Id) => selectArticleAsListItem(store, id), article.relatedArticles) : undefined;
    return denormalizeArticle(locale, article, relatedArticles, relatedTasks);
};

export const selectArticleAsListItem = (store: app.Store, articleId: model.Id): Article => {
    const locale = selectLocale(store);
    const articles = store.applicationState.articlesInStore.articles;
    const article = findArticleById(articles, articleId);
    return denormalizeArticle(locale, article, [], []);
};

export const findArticleById = (articles: model.ArticleMap, articleId: model.Id): model.Article => {
    const validate = validateOneResultWasFound(articleId);
    const getArticle = R.compose(validate, R.values, R.pickBy(R.propEq('id', articleId)));
    return getArticle(articles);
};

const validateOneResultWasFound =
    R.curry((articleId: string, articles: ReadonlyArray<model.Article>): model.Article => {
        if (articles.length !== 1) {
            throw new Error(`Could not find Article for article id: ${articleId}`);
        }
        return articles[0];
    });

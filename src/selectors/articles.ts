import * as app from '../application/store';
import * as model from '../stores/articles';
import * as R from 'ramda';
import { selectLocalizedText } from './locale';
import { Locale } from '../locale/types';
import { Task, selectTaskById } from './tasks';
import { Id as TaskId } from '../stores/tasks';

export interface Article {
    readonly name: string;
    readonly content: string;
    readonly isStarred: boolean;
    readonly relatedTasks?: ReadonlyArray<Task>;
    readonly relatedArticles?: ReadonlyArray<Article>;
}

export const denormalizeArticle = (locale: Locale, article: model.Article): Article => (
    {
        name: selectLocalizedText(locale, article.name),
        content: selectLocalizedText(locale, article.content),
        isStarred: article.isStarred,
    }
);

export const selectArticle = (locale: Locale, store: app.Store, articleId: model.Id): Article => {
    const articles = store.applicationState.articlesInStore.articles;
    if (articles[articleId] === undefined) {
        throw new Error(`Could not find Article for article id: ${articleId}`);
    }
    const article = articles[articleId];
    const relatedTasks = article.relatedTasks ? selectRelatedTasks(locale, store, article.relatedTasks) : undefined;
    const relatedArticles = article.relatedArticles ? selectRelatedArticles(locale, store, article.relatedArticles) : undefined;
    return { ...denormalizeArticle(locale, article), relatedTasks, relatedArticles };
};

export const selectArticleAsListItem = (locale: Locale, store: app.Store, articleId: model.Id): Article => {
    const articles = store.applicationState.articlesInStore.articles;
    if (articles[articleId] === undefined) {
        throw new Error(`Could not find Article for article id: ${articleId}`);
    }
    return denormalizeArticle(locale, articles[articleId]);
};

export const selectRelatedTasks = (locale: Locale, store: app.Store, taskIds: ReadonlyArray<TaskId>): ReadonlyArray<Task> => (
    R.map((id: TaskId) => selectTaskById(locale, store.applicationState.tasksInStore, id), taskIds)
);

export const selectRelatedArticles = (locale: Locale, store: app.Store, articleIds: ReadonlyArray<model.Id>): ReadonlyArray<Article> => (
    R.map((id: model.Id) => selectArticleAsListItem(locale, store, id), articleIds)
);

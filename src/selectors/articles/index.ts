import { Store } from '../../stores';
import * as model from '../../stores/articles';
import * as R from 'ramda';
import * as taskDetails from '../details/tasks';
import { selectLocale, selectLocalizedText } from '../locale';
import { Locale } from '../../locale/types';
import { TaskListItem, selectRelatedTasks } from '../tasks';
import { RouterProps } from '../../application/routing';
import { ExploreSection } from '../explore';
import { buildExploreSection } from '../details/explore';
import { selectExploreTaxonomy } from '../taxonomies';
import { selectIconFromExploreTaxonomy } from '../select_icon_from_explore_taxonomy';
import { toSelectorArticle } from './to_selector_article';

export interface Article {
    readonly id: model.Id;
    readonly title: string;
    readonly description: string;
    readonly starred: boolean;
    readonly exploreSection: ExploreSection;
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
}

export interface ArticleListItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
}

export const denormalizeArticleListItem = R.curry((locale: Locale, article: model.Article): ArticleListItem => (
    {
        id: article.id,
        title: selectLocalizedText(locale, article.title),
        description: selectLocalizedText(locale, article.description),
    }
));

export const selectRelatedArticles = (store: Store, articleIds: ReadonlyArray<model.Id>): ReadonlyArray<ArticleListItem> => (
    R.map((id: model.Id) => selectArticleAsListItem(store, id), articleIds)
);

export const selectArticleAsListItem = (store: Store, articleId: model.Id): ArticleListItem => {
    const locale = selectLocale(store);
    const articles = store.articlesInStore.articles;
    const article = articles[articleId];
    return denormalizeArticleListItem(locale, article);
};

export const selectArticle = (store: Store, routerProps: RouterProps): Article => {
    const locale = selectLocale(store);
    const articles = store.articlesInStore.articles;
    const article = articles[routerProps.match.params.articleId];
    const relatedTasks = selectRelatedTasks(store, article.relatedTasks);
    const relatedArticles = selectRelatedArticles(store, article.relatedArticles);
    const storeExploreSection = taskDetails.findExploreSectionBy(article, store.exploreSectionsInStore.sections);
    const exploreTaxonomy = selectExploreTaxonomy(store);
    const icon = selectIconFromExploreTaxonomy(storeExploreSection.taxonomyTerms, exploreTaxonomy);
    const exploreSection = buildExploreSection(locale, storeExploreSection, icon);
    return toSelectorArticle(locale, article, exploreSection, relatedArticles, relatedTasks);
};

export const selectArticlesForLearnDetail = (store: Store, routerProps: RouterProps): ReadonlyArray<ArticleListItem> => {
    const learnId = routerProps.match.params.learnId;
    const exploreSection = store.exploreSectionsInStore.sections[learnId];
    const articles = store.articlesInStore.articles;
    const matchingArticles = taskDetails.findItemByLearnTaxonomyTerm(exploreSection.taxonomyTerms, articles);

    const locale = selectLocale(store);
    const denormalizedArticles = R.map(denormalizeArticleListItem(locale), matchingArticles);

    return denormalizedArticles;
};

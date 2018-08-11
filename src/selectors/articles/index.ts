import { Store } from '../../stores';
import * as model from '../../stores/articles';
import * as R from 'ramda';
import * as taskDetails from '../details/tasks';
import { selectLocale } from '../locale';
import { TaskListItem, selectRelatedTasks } from '../tasks';
import { RouterProps } from '../../application/routing';
import { ExploreSection } from '../explore';
import { buildExploreSection } from '../details/explore';
import { selectExploreTaxonomy } from '../taxonomies';
import { selectIconFromExploreTaxonomy } from '../select_icon_from_explore_taxonomy';
import { toSelectorArticle } from './to_selector_article';
import { toSelectorArticleListItem } from './to_selector_article_list_item';
import { toSelectorArticleList } from './to_selector_article_list';

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

export const selectArticle = (store: Store, routerProps: RouterProps): Article => {
    const locale = selectLocale(store);
    const articles = store.articlesInStore.articles;
    const article = articles[routerProps.match.params.articleId];
    const relatedTasks = selectRelatedTasks(store, article.relatedTasks);
    const relatedArticles = toSelectorArticleList(store, article.relatedArticles);
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
    const denormalizedArticles = R.map(toSelectorArticleListItem(locale), matchingArticles);

    return denormalizedArticles;
};

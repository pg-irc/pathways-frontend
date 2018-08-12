import { Store } from '../../stores';
import * as taskDetails from '../details/tasks';
import { selectLocale } from '../locale/select_locale';
import { selectRelatedTasks } from '../tasks';
import { RouterProps } from '../../application/routing';
import { pullExploreTaxonomy } from '../taxonomies/pull_explore_taxonomy';
import { selectIconFromExploreTaxonomy } from '../explore/select_icon_from_explore_taxonomy';
import { toSelectorArticle } from './to_selector_article';
import { toSelectorArticleList } from './to_selector_article_list';
import { Article } from './types';
import { buildExploreSection } from '../explore/build_explore_section';

export const selectArticle = (store: Store, routerProps: RouterProps): Article => {
    const locale = selectLocale(store);
    const articles = store.articlesInStore.articles;
    const article = articles[routerProps.match.params.articleId];
    const relatedTasks = selectRelatedTasks(store, article.relatedTasks);
    const relatedArticles = toSelectorArticleList(store, article.relatedArticles);
    const storeExploreSection = taskDetails.findExploreSectionBy(article, store.exploreSectionsInStore.sections);
    const exploreTaxonomy = pullExploreTaxonomy(store);
    const icon = selectIconFromExploreTaxonomy(storeExploreSection.taxonomyTerms, exploreTaxonomy);
    const exploreSection = buildExploreSection(locale, storeExploreSection, icon);
    return toSelectorArticle(locale, article, exploreSection, relatedArticles, relatedTasks);
};

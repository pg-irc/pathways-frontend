import { Store } from '../../stores';
import * as R from 'ramda';
import * as taskDetails from '../details/tasks';
import { selectLocale } from '../locale';
import { RouterProps } from '../../application/routing';
import { toSelectorArticleListItem } from './to_selector_article_list_item';
import { ArticleListItem } from './types';
import { pullExploreSection } from '../explore/pull_explore_section';

export const selectArticlesForExploreDetail = (store: Store, routerProps: RouterProps): ReadonlyArray<ArticleListItem> => {
    const exploreId = routerProps.match.params.learnId;
    const exploreSection = pullExploreSection(store, exploreId);
    const articles = store.articlesInStore.articles;
    const matchingArticles = taskDetails.findItemByLearnTaxonomyTerm(exploreSection.taxonomyTerms, articles);

    const locale = selectLocale(store);
    return R.map(toSelectorArticleListItem(locale), matchingArticles);
};

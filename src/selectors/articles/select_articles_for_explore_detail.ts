import { Store } from '../../stores';
import * as R from 'ramda';
import * as taskDetails from '../details/tasks';
import { selectLocale } from '../locale/select_locale';
import { RouterProps } from '../../application/routing';
import { toSelectorArticleListItem } from './to_selector_article_list_item';
import { ArticleListItem } from './article_list_item';
import { pullExploreSectionById } from '../explore/pull_explore_section_by_id';

export const selectArticlesForExploreDetail = (store: Store, routerProps: RouterProps): ReadonlyArray<ArticleListItem> => {
    const exploreId = routerProps.match.params.learnId;
    const exploreSection = pullExploreSectionById(store, exploreId);
    const articles = store.articlesInStore.articles;
    const matchingArticles = taskDetails.findItemByLearnTaxonomyTerm(exploreSection.taxonomyTerms, articles);

    const locale = selectLocale(store);
    return R.map(toSelectorArticleListItem(locale), matchingArticles);
};

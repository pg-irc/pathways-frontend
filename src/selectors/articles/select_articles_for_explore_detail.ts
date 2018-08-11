import { Store } from '../../stores';
import * as R from 'ramda';
import * as taskDetails from '../details/tasks';
import { selectLocale } from '../locale';
import { RouterProps } from '../../application/routing';
import { toSelectorArticleListItem } from './to_selector_article_list_item';
import { ArticleListItem } from './types';

export const selectArticlesForExploreDetail = (store: Store, routerProps: RouterProps): ReadonlyArray<ArticleListItem> => {
    const learnId = routerProps.match.params.learnId;
    const exploreSection = store.exploreSectionsInStore.sections[learnId];
    const articles = store.articlesInStore.articles;
    const matchingArticles = taskDetails.findItemByLearnTaxonomyTerm(exploreSection.taxonomyTerms, articles);

    const locale = selectLocale(store);
    const denormalizedArticles = R.map(toSelectorArticleListItem(locale), matchingArticles);

    return denormalizedArticles;
};

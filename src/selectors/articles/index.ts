import { Store } from '../../stores';
import * as model from '../../stores/articles';
import * as R from 'ramda';
import * as taskDetails from '../details/tasks';
import { selectLocale } from '../locale';
import { TaskListItem } from '../tasks';
import { RouterProps } from '../../application/routing';
import { ExploreSection } from '../explore';
import { toSelectorArticleListItem } from './to_selector_article_list_item';

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

export const selectArticlesForLearnDetail = (store: Store, routerProps: RouterProps): ReadonlyArray<ArticleListItem> => {
    const learnId = routerProps.match.params.learnId;
    const exploreSection = store.exploreSectionsInStore.sections[learnId];
    const articles = store.articlesInStore.articles;
    const matchingArticles = taskDetails.findItemByLearnTaxonomyTerm(exploreSection.taxonomyTerms, articles);

    const locale = selectLocale(store);
    const denormalizedArticles = R.map(toSelectorArticleListItem(locale), matchingArticles);

    return denormalizedArticles;
};

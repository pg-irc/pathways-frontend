import * as model from '../../stores/articles';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { TaskListItem } from '../tasks';
import { ExploreSection } from '../explore/types';
import { ArticleListItem } from './article_list_item';
import { Article } from './article';

export const toSelectorArticle = (
    locale: Locale,
    article: model.Article,
    exploreSection: ExploreSection,
    relatedArticles: ReadonlyArray<ArticleListItem>,
    relatedTasks: ReadonlyArray<TaskListItem>): Article =>
    (
        {
            id: article.id,
            title: getLocalizedText(locale, article.title),
            description: getLocalizedText(locale, article.description),
            starred: article.starred,
            exploreSection: exploreSection,
            relatedArticles: relatedArticles,
            relatedTasks: relatedTasks,
        }
    );

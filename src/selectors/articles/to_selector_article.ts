import * as model from '../../stores/articles';
import { selectLocalizedText } from '../locale';
import { Locale } from '../../locale/types';
import { TaskListItem } from '../tasks';
import { ExploreSection } from '../explore';
import { ArticleListItem, Article } from './types';

export const toSelectorArticle = (
    locale: Locale,
    article: model.Article,
    exploreSection: ExploreSection,
    relatedArticles: ReadonlyArray<ArticleListItem>,
    relatedTasks: ReadonlyArray<TaskListItem>): Article =>
    (
        {
            id: article.id,
            title: selectLocalizedText(locale, article.title),
            description: selectLocalizedText(locale, article.description),
            starred: article.starred,
            exploreSection: exploreSection,
            relatedArticles: relatedArticles,
            relatedTasks: relatedTasks,
        }
    );

import * as store from '../../stores/tasks';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { ArticleListItem } from '../articles/article_list_item';
import { ExploreSection } from '../explore/types';
import { Task, TaskListItem } from '.';

export const toSelectorTask =
    (locale: Locale, task: store.Task, exploreSection: ExploreSection, isRecommended: boolean,
        relatedArticles: ReadonlyArray<ArticleListItem>, relatedTasks: ReadonlyArray<TaskListItem>): Task => (
            {
                id: task.id,
                title: getLocalizedText(locale, task.title),
                description: getLocalizedText(locale, task.description),
                taxonomyTerms: task.taxonomyTerms,
                exploreSection: exploreSection,
                isRecommended: isRecommended,
                relatedArticles: relatedArticles,
                relatedTasks: relatedTasks,
                category: task.category,
                importance: task.importance,
                completed: task.completed,
            }
        );


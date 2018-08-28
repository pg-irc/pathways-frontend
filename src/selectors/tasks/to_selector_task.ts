import * as store from '../../stores/tasks';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { ArticleListItem } from '../articles/article_list_item';
import { ExploreSection } from '../explore/types';
import { TaskListItem } from './task_list_item';
import { Task } from './task';

export const toSelectorTask =
    (locale: Locale, task: store.Task, exploreSection: ExploreSection, isRecommended: boolean,
        relatedArticles: ReadonlyArray<ArticleListItem>, relatedTasks: ReadonlyArray<TaskListItem>): Task => (
            {
                id: task.id,
                title: getLocalizedText(locale, task.title),
                description: getLocalizedText(locale, task.description),
                taxonomyTerms: task.taxonomyTerms,
                exploreSection,
                isRecommended,
                relatedArticles,
                relatedTasks,
                completed: task.completed,
                serviceQuery: task.serviceQuery,
            }
        );

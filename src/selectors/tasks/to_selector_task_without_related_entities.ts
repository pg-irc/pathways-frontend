import * as store from '../../stores/tasks';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore/types';
import { toSelectorTask } from './to_selector_task';
import { Task } from './task';
import { TaskListItem } from './task_list_item';
import { ArticleListItem } from '../articles/article_list_item';

export const toSelectorTaskWithoutRelatedEntities =
    (locale: Locale, task: store.Task, exploreSection: ExploreSection, isRecommended: boolean): Task => {
        const noRelatedArticles: ReadonlyArray<ArticleListItem> = [];
        const noRelatedTasks: ReadonlyArray<TaskListItem> = [];
        return toSelectorTask(locale, task, exploreSection, isRecommended, noRelatedArticles, noRelatedTasks);
    };

import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { ArticleListItem } from '../articles/article_list_item';
import { ExploreSection } from '../explore/types';
import { TaskListItem } from './task_list_item';

export interface Task {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly exploreSection: ExploreSection;
    readonly isRecommended: boolean;
    readonly category: string;
    readonly importance: number;
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
    readonly completed: boolean;
}

import * as model from '../../stores/articles';
import { TaskListItem } from '../tasks';
import { ExploreSection } from '../explore/types';

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

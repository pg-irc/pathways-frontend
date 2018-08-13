import * as model from '../../stores/articles';
import { TaskListItem } from '../tasks';
import { ExploreSection } from '../explore/types';
import { ArticleListItem } from './article_list_item';

export interface Article {
    readonly id: model.Id;
    readonly title: string;
    readonly description: string;
    readonly starred: boolean;
    readonly exploreSection: ExploreSection;
    readonly relatedArticles: ReadonlyArray<ArticleListItem>;
    readonly relatedTasks: ReadonlyArray<TaskListItem>;
}

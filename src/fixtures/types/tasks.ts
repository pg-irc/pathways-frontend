import { LocalizedText } from '../../locale';
import { Id as ArticleId } from './articles';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Task {
    readonly id: Id;
    readonly title: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly relatedTasks: ReadonlyArray<Id>;
    readonly relatedArticles: ReadonlyArray<ArticleId>;
    readonly completed: boolean;
    readonly tags?: ReadonlyArray<string>;
    readonly category?: string;
    readonly importance?: number;
}

export interface TaskMap {
    readonly [property: string]: Task;
}

export type TaskList = ReadonlyArray<Id>;

export interface Store {
    readonly taskMap: TaskMap;
    readonly savedTasksList: TaskList;
}

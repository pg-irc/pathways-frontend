import { LocalizedText } from '../../locale';
import { Id as ArticleId } from './articles';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Task {
    readonly id: Id;
    readonly chapter: string;
    readonly title: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly relatedTasks: ReadonlyArray<Id>;
    readonly relatedArticles: ReadonlyArray<ArticleId>;
    readonly serviceQuery: string;
    readonly completed: boolean;
}

export interface TaskMap {
    readonly [property: string]: Task;
}

export type TaskList = ReadonlyArray<Id>;

export interface Store {
    readonly taskMap: TaskMap;
    readonly savedTasksList: TaskList;
}

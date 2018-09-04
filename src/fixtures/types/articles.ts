import { LocalizedText } from '../../locale';
import { Id as TaskId } from './tasks';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Article {
    readonly id: Id;
    readonly chapter: string;
    readonly title: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly relatedTasks: ReadonlyArray<TaskId>;
    readonly relatedArticles: ReadonlyArray<Id>;
    readonly isRecommendedToAllUsers: boolean;
    readonly starred: boolean;
}

export interface ArticleMap {
    readonly [key: string]: Article;
}

export interface ArticleStore {
    readonly articles: ArticleMap;
}

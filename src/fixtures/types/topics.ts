import { LocalizedText } from '../../locale';
import { TaxonomyTermReference } from './taxonomies';

export type Id = string;

export interface Topic {
    readonly id: Id;
    readonly region: string;
    readonly chapter: string;
    readonly title: LocalizedText;
    readonly description: LocalizedText;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly relatedTopics: ReadonlyArray<Id>;
    readonly isNewlyRecommended: boolean;
}

export interface TopicMap {
    readonly [property: string]: Topic;
}

export type TopicList = ReadonlyArray<Id>;

export interface IStore {
    readonly topicMap: TopicMap;
    readonly bookmarkedTopics: TopicList;
}

// tslint:disable:no-class no-this no-expression-statement

export class ValidTopicStore {
    constructor(parameters: IStore) {
        this.topicMap = parameters.topicMap;
        this.bookmarkedTopics = parameters.bookmarkedTopics;
    }
    readonly topicMap: TopicMap;
    readonly bookmarkedTopics: TopicList;
}

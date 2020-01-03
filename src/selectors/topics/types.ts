import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { ExploreSection } from '../explore/types';

export interface Topic {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly exploreSection: ExploreSection;
    readonly isRecommended: boolean;
    readonly relatedTopics: ReadonlyArray<TopicListItem>;
}

export interface TopicListItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly isRecommended: boolean;
    readonly exploreSection: ExploreSection;
}

export type ExploreTopic = Topic | TopicListItem;

export type ExploreTopicList = ReadonlyArray<Topic> | ReadonlyArray<TopicListItem>;
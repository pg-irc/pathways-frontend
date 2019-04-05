import { TaxonomyTermReference } from '../taxonomies/pull_explore_taxonomy';
import { ExploreSection } from '../explore/types';
import { TopicListItem } from './topic_list_item';

export interface Topic {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly taxonomyTerms: ReadonlyArray<TaxonomyTermReference>;
    readonly exploreSection: ExploreSection;
    readonly isRecommended: boolean;
    readonly relatedTopics: ReadonlyArray<TopicListItem>;
    readonly completed: boolean;
}

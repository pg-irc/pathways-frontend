import * as store from '../../stores/topics';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore/types';
import { toSelectorTopic } from './to_selector_topic';
import { Topic } from './types';
import { TopicListItem } from './topic_list_item';

export const toSelectorTopicWithoutRelatedEntities =
    (locale: Locale, topic: store.Topic, exploreSection: ExploreSection, isRecommended: boolean): Topic => {
        const noRelatedTopics: ReadonlyArray<TopicListItem> = [];
        return toSelectorTopic(locale, topic, exploreSection, isRecommended, noRelatedTopics);
    };

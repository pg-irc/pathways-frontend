import * as store from '../../stores/topics';
import { LocaleCode } from '../../locale';
import { ExploreSection } from '../explore/types';
import { toSelectorTopic } from './to_selector_topic';
import { Topic } from './types';
import { TopicListItem } from './types';

export const toSelectorTopicWithoutRelatedEntities =
    (locale: LocaleCode, topic: store.Topic, exploreSection: ExploreSection, isRecommended: boolean): Topic => {
        const noRelatedTopics: ReadonlyArray<TopicListItem> = [];
        return toSelectorTopic(locale, topic, exploreSection, isRecommended, noRelatedTopics);
    };

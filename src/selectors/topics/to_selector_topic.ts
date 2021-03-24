import * as store from '../../stores/topics';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore/types';
import { TopicListItem } from './types';
import { Topic } from './types';

export const toSelectorTopic =
    (locale: Locale, topic: store.Topic, exploreSection: ExploreSection, isRecommended: boolean,
        relatedTopics: ReadonlyArray<TopicListItem>): Topic => (
            {
                id: topic.id,
                region: topic.region,
                title: getLocalizedText(locale, topic.title),
                description: getLocalizedText(locale, topic.description),
                taxonomyTerms: topic.taxonomyTerms,
                exploreSection,
                isRecommended,
                relatedTopics,
            }
        );

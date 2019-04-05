import * as store from '../../stores/topics';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { TopicListItem } from './topic_list_item';
import { ExploreSection } from '../explore/types';

export const toSelectorTaskListItem = (locale: Locale, topic: store.Topic, isRecommended: boolean, exploreSection: ExploreSection): TopicListItem => (
    {
        id: topic.id,
        title: getLocalizedText(locale, topic.title),
        description: getLocalizedText(locale, topic.description),
        isRecommended: isRecommended,
        completed: topic.completed,
        exploreSection: exploreSection,
    }
);

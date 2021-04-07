import * as store from '../../stores/topics';
import { getLocalizedText } from '../locale/get_localized_text';
import { LocaleCode } from '../../locale/types';
import { TopicListItem } from './types';
import { ExploreSection } from '../explore/types';

export const toSelectorTopicListItem = (
    locale: LocaleCode,
    topic: store.Topic,
    isRecommended: boolean,
    exploreSection: ExploreSection): TopicListItem => (
        {
            id: topic.id,
            title: getLocalizedText(locale, topic.title),
            description: getLocalizedText(locale, topic.description),
            isRecommended: isRecommended,
            exploreSection: exploreSection,
        }
    );

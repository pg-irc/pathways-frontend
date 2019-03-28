import * as store from '../../stores/topics';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { TopicListItem } from './topic_list_item';
import { ExploreSection } from '../explore/types';

export const toSelectorTaskListItem = (locale: Locale, task: store.Topic, isRecommended: boolean, exploreSection: ExploreSection): TopicListItem => (
    {
        id: task.id,
        title: getLocalizedText(locale, task.title),
        description: getLocalizedText(locale, task.description),
        isRecommended: isRecommended,
        completed: task.completed,
        exploreSection: exploreSection,
    }
);

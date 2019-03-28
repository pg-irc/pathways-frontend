import * as store from '../../stores/topics';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore/types';
import { TopicListItem } from './topic_list_item';
import { Topic } from './topic';

export const toSelectorTask =
    (locale: Locale, task: store.Topic, exploreSection: ExploreSection, isRecommended: boolean,
        relatedTopics: ReadonlyArray<TopicListItem>): Topic => (
            {
                id: task.id,
                title: getLocalizedText(locale, task.title),
                description: getLocalizedText(locale, task.description),
                taxonomyTerms: task.taxonomyTerms,
                exploreSection,
                isRecommended,
                relatedTopics,
                completed: task.completed,
            }
        );

import * as store from '../../stores/topics';
import { Locale } from '../../locale/types';
import { ExploreSection } from '../explore/types';
import { toSelectorTask } from './to_selector_task';
import { Topic } from './topic';
import { TopicListItem } from './topic_list_item';

export const toSelectorTaskWithoutRelatedEntities =
    (locale: Locale, task: store.Topic, exploreSection: ExploreSection, isRecommended: boolean): Topic => {
        const noRelatedTopics: ReadonlyArray<TopicListItem> = [];
        return toSelectorTask(locale, task, exploreSection, isRecommended, noRelatedTopics);
    };

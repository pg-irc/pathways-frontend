import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { buildSelectorTopicListItem } from './build_selector_topic_list_item';
import { TopicListItem } from './types';
import { sortTopicListItems } from './sort_topic_list_items';

export const selectRelatedTopics = (appStore: Store, taskIds: ReadonlyArray<store.Id>): ReadonlyArray<TopicListItem> => {
    const relatedTopics = R.map(buildSelectorTopicListItem(appStore), taskIds);
    return sortTopicListItems(relatedTopics);
};

import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { buildSelectorTopicListItem } from './build_selector_topic_list_item';
import { sortTopicList } from './sort_topic_list';
import { ExploreTopicList } from './types';

export const selectRelatedTopics = (appStore: Store, taskIds: ReadonlyArray<store.Id>): ExploreTopicList => {
    const relatedTopics = R.map(buildSelectorTopicListItem(appStore), taskIds);
    return sortTopicList(relatedTopics);
};

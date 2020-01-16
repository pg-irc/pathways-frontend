import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './types';
import { buildSelectorTopicListItem } from './build_selector_topic_list_item';
import { pickBookmarkedTopicIds } from './pick_bookmarked_topic_ids';

export const selectBookmarkedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTopicListItem(appStore), pickBookmarkedTopicIds(appStore))
);

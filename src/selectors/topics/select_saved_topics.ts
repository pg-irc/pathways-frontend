import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './topic_list_item';
import { buildSelectorTopicListItem } from './build_selector_topic_list_item';
import { pickSavedTopicIds } from './pick_saved_topic_ids';

export const selectSavedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTopicListItem(appStore), pickSavedTopicIds(appStore))
);

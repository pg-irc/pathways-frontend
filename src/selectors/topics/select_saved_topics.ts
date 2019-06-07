import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './topic_list_item';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickSavedTopicIds } from './pick_saved_topic_ids';

export const selectSavedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTaskListItem(appStore), pickSavedTopicIds(appStore))
);

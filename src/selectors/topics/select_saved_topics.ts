import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './topic_list_item';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickSavedTaskIds } from './pick_saved_task_ids';

export const selectSavedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTaskListItem(appStore), pickSavedTaskIds(appStore))
);

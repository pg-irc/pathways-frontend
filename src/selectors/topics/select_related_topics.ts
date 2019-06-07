import * as R from 'ramda';
import { Store } from '../../stores';
import * as store from '../../stores/topics';
import { TopicListItem } from './topic_list_item';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';

export const selectRelatedTopics = (appStore: Store, taskIds: ReadonlyArray<store.Id>): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTaskListItem(appStore), taskIds)
);

import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './topic_list_item';
import { buildSelectorTaskListItem } from './build_selector_task_list_item';
import { pickTopics } from './pick_topics';

export const selectCompletedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTaskListItem(appStore), R.keys(R.pickBy(R.prop('completed'), pickTopics(appStore))))
);

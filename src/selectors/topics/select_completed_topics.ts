import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './types';
import { buildSelectorTopicListItem } from './build_selector_topic_list_item';
import { pickTopics } from './pick_topics';

export const selectCompletedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTopicListItem(appStore), R.keys(R.pickBy(R.prop('completed'), pickTopics(appStore))))
);

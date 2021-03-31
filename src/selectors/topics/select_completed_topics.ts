import * as R from 'ramda';
import { Store } from '../../stores';
import { TopicListItem } from './types';
import { buildSelectorTopicListItem } from './build_selector_topic_list_item';
import { selectTopicsForCurrentRegion } from './select_topics_for_current_region';

export const selectCompletedTopics = (appStore: Store): ReadonlyArray<TopicListItem> => (
    R.map(buildSelectorTopicListItem(appStore), R.keys(R.pickBy(R.prop('completed'), selectTopicsForCurrentRegion(appStore))))
);

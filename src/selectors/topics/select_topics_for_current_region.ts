import { Store } from '../../stores';
import { TopicMap } from '../../stores/topics';
import { filterTopicsByRegion } from './filter_topics_by_region';
import { selectRegion } from '../region/select_region';
import { pickTopics } from './pick_topics';

export const selectTopicsForCurrentRegion = (appStore: Store): TopicMap => (
    filterTopicsByRegion(selectRegion(appStore), pickTopics(appStore))
);

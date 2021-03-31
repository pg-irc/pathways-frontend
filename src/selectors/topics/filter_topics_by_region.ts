import { TopicMap } from '../../stores/topics';
import * as R from 'ramda';

export const filterTopicsByRegion = (region: string, topics: TopicMap): TopicMap => (
    R.filter(R.propEq('region', region), topics)
);

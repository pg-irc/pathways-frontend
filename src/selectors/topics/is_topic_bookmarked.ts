import * as R from 'ramda';
import { Store } from '../../stores';
import { pickBookmarkedTopicIds } from './pick_bookmarked_topic_ids';

export const isTopicBookmarked = (appStore: Store, topicId: string): boolean => {
    const savedTopicIdsList = pickBookmarkedTopicIds(appStore);
    return R.contains(topicId, savedTopicIdsList);
};
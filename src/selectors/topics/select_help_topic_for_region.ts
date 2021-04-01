import { Store } from '../../stores';
import { Topic } from './types';
import { selectTopicById } from './select_topic_by_id';
import { pickRegion } from '../region/pick_region';
import { getHelpTopicIdForRegion } from './get_help_topicId_for_region';

export const selectHelpTopicForRegion = (appStore: Store): Topic => {
    const region = pickRegion(appStore);
    const topicId = getHelpTopicIdForRegion(region);
    return selectTopicById(appStore, topicId);
};

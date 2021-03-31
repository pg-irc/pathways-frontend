import { Store } from '../../stores';
import { Topic } from './types';
import { selectTopicById } from './select_topic_by_id';
import { pickRegion } from '../region/pick_region';

export const selectHelpTopicForRegion = (appStore: Store): Topic => {
    const region = pickRegion(appStore)?.toLowerCase();
    if (region === 'bc') {
        return selectTopicById(appStore, 'contact-workers-at-your-local-settlement-agency_bc');
    }
    if (region === 'mb') {
        return selectTopicById(appStore, 'contact-workers-at-your-local-settlement-agency_mb');
    }
    throw new Error('Invalid region');
};

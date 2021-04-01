import { Store } from '../../stores';
import { pickRegion } from '../region/pick_region';

export const selectHelpTopicForRegion = (appStore: Store): string => {
    const region = pickRegion(appStore)?.toLowerCase();
    if (!region || region === 'bc') {
        return 'contact-workers-at-your-local-settlement-agency_bc';
    }
    if (region === 'mb') {
        return 'contact-workers-at-your-local-settlement-agency_mb';
    }
    throw new Error('Invalid region');
};

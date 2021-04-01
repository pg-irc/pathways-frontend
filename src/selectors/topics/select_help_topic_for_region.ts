import { Store } from '../../stores';
import { pickRegion } from '../region/pick_region';
import { RegionCode } from '../../validation/region/types';

export const selectHelpTopicForRegion = (appStore: Store): string => {
    const region = pickRegion(appStore);
    if (!region || region === RegionCode.BC) {
        return 'contact-workers-at-your-local-settlement-agency_bc';
    }
    if (region === RegionCode.MB) {
        return 'contact-workers-at-your-local-settlement-agency_mb';
    }
    throw new Error('Invalid region');
};

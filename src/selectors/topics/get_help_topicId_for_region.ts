import { RegionCode } from '../../validation/region/types';

export const getHelpTopicIdForRegion = (region: RegionCode): string => {
    if (!region || region === RegionCode.BC) {
        return 'contact-workers-at-your-local-settlement-agency_bc';
    }
    if (region === RegionCode.MB) {
        return 'contact-workers-at-your-local-settlement-agency_mb';
    }
    throw new Error('Invalid region');
};

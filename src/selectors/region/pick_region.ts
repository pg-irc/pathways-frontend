import { Store } from '../../stores';
import { RegionCode } from '../../validation/region/types';

export const pickRegion = (appStore: Store): RegionCode => {
    return appStore.userProfile.region;
};

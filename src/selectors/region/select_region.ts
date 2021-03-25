import { Store } from '../../stores';
import { RegionCode } from '../../validation/region/types';

export const selectRegion = (appStore: Store): RegionCode => {
    return appStore.userProfile.region;
};

import { Store } from '../../stores';
import { Region } from '../../region/types';

export const selectRegion = (appStore: Store): Region => {
    return appStore.region;
};

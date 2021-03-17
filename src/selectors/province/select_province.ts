import { Store } from '../../stores';
import { Province } from '../../province/types';

export const selectProvince = (appStore: Store): Province => {
    return appStore.province;
};

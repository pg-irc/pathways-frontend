import { Store } from '../../stores';
import { RegionDrawer } from '../../stores/user_experience';

export const selectIsRegionDrawerVisible = (appStore: Store): boolean => (
    appStore.userExperience.regionDrawer !== RegionDrawer.RegionDrawerIsClosed
);
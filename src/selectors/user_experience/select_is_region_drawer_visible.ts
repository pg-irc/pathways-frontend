import { Store } from '../../stores';
import { RegionDrawer } from '../../stores/user_experience';

export const selectIsRegionDrawerOpen = (appStore: Store): boolean => (
    appStore.userExperience.regionDrawer === RegionDrawer.RegionDrawerIsOpen
);
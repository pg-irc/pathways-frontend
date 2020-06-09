import { Store } from '../../stores';

export const selectBookmarkedServicesOffset = (appStore: Store): number => (
    appStore.userExperience.bookmarkedServicesOffset
);
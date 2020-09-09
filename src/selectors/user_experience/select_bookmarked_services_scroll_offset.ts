import { Store } from '../../stores';

export const selectBookmarkedServicesScrollOffset = (appStore: Store): number => (
    appStore.userExperience.bookmarkedServicesScrollOffset
);

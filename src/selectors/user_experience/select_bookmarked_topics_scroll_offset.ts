import { Store } from '../../stores';

export const selectBookmarkedTopicsScrollOffset = (appStore: Store): number => (
    appStore.userExperience.bookmarkedTopicsScrollOffset
);

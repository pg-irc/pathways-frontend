import { Store } from '../../stores';
import { BookmarksTab } from '../../stores/user_experience';

export const selectBookmarksTab = (appStore: Store): BookmarksTab => (
    appStore.userExperience.bookmarksTab
);
import { Store } from '../../stores';
import { BookmarksTabStore } from '../../stores/bookmarks_tab';

export const selectBookmarksTab = (appStore: Store): BookmarksTabStore => (
    appStore.bookmarksTab
);
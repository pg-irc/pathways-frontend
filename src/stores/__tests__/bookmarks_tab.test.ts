// tslint:disable:no-expression-statement
import { BookmarksTabStore, reducer, setBookmarksTab } from '../bookmarks_tab';

describe('the bookmarks tab reducer', () => {

    describe('the bookmarks tab state', () => {

        it('is set to topics when set bookmarks topic is set to 0', () => {
            const oldStore = BookmarksTabStore.Services;
            const newStore = reducer(oldStore, setBookmarksTab(0));
            expect(newStore).toBe(BookmarksTabStore.Topics);
        });

        it ('is set to services when set bookmarks tab is set to 1', () => {
            const oldStore = BookmarksTabStore.Topics;
            const newStore = reducer(oldStore, setBookmarksTab(1));
            expect(newStore).toBe(BookmarksTabStore.Services);
        });
    });
});
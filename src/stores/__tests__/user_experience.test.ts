// tslint:disable:no-expression-statement
import { buildDefaultStore, reducer, BookmarksTab } from '../user_experience';
import { saveSearchOffset, saveTopicServicesOffset, saveBookmarkedServicesOffset, setBookmarksTab } from '../user_experience/actions';
import { aNumber } from '../../application/helpers/random_test_values';

describe('the user experience reducer', () => {

    describe('the search offset state', () => {

        it('is set to an offset number value by the save search offset action', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, saveSearchOffset(offset));
            expect(newStore.searchOffset).toBe(offset);
        });
    });

    describe('the topic services offset state', () => {

        it('is set to an offset number value by the save topic services offset action', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, saveTopicServicesOffset(offset));
            expect(newStore.topicServicesOffset).toBe(offset);
        });
    });

    describe('the bookmarked services offset state', () => {

        it('is set to an offset number value by the save bookmarked services offset action', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, saveBookmarkedServicesOffset(offset));
            expect(newStore.bookmarkedServicesOffset).toBe(offset);
        });
    });

    describe('the bookmarks tab state', () => {

        it('is set to topics when set bookmarks topic is set to 0', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, setBookmarksTab(0));
            expect(newStore.bookmarksTab).toBe(BookmarksTab.Topics);
        });

        it ('is set to services when set bookmarks tab is set to 1', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, setBookmarksTab(1));
            expect(newStore.bookmarksTab).toBe(BookmarksTab.Services);
        });
    });
});
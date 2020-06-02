// tslint:disable:no-expression-statement
import { buildDefaultStore, reducer, saveSearchOffset, saveTopicServicesOffset, saveBookmarkedServicesOffset } from '../list_offset';
import { aNumber } from '../../application/helpers/random_test_values';

describe('the list offset reducer', () => {

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
});
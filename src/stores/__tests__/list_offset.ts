// tslint:disable:no-expression-statement

import { buildDefaultStore, reducer, saveListOffset, clearListOffset } from '../list_offset';
import { aNumber } from '../../application/helpers/random_test_values';

describe('the list offset reducer', () => {

    describe('the list offset state', () => {

        it('is set a number value by the save list offset action', () => {
            const oldStore = buildDefaultStore();
            const offset = aNumber();
            const newStore = reducer(oldStore, saveListOffset(offset));
            expect(newStore.listOffset).toBe(offset);
        });

        it ('is set to zero by the clear list offset action', () => {
            const oldStore = { listOffset: aNumber() };
            const newStore = reducer(oldStore, clearListOffset());
            expect(newStore.listOffset).toBe(0);
        });
    });
});
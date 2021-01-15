// tslint:disable: no-expression-statement typedef

import { buildDefaultStore, reducer } from '../reviews';
import { chooseRating } from '../reviews/actions';

describe('the reviews reducer', () => {

    describe('the rating state', () => {

        it('is set to a number value by the choose rating action', () => {
            const oldStore = buildDefaultStore();
            const rating = 5 * Math.random();
            const newStore = reducer(oldStore, chooseRating(rating));
            expect(newStore.rating).toBe(rating);
        });
    });
});
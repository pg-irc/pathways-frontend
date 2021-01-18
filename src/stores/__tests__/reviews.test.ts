// tslint:disable: no-expression-statement typedef
import { buildDefaultStore, reducer } from '../reviews';
import { chooseRating, closeDiscardChangesModal, openDiscardChangesModal } from '../reviews/actions';

describe('the reviews reducer', () => {

    describe('the rating state', () => {

        it('is set to a number value by the choose rating action', () => {
            const oldStore = buildDefaultStore();
            const rating = 5 * Math.random();
            const newStore = reducer(oldStore, chooseRating(rating));
            expect(newStore.rating).toBe(rating);
        });
    });

    describe('the show discard changes modal state', () => {

        it('is set to true by the open discard changes modal action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, openDiscardChangesModal());
            expect(newStore.showDiscardChangesModal).toBe(true);
        });

        it('is set to false by the open discard changes modal action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, closeDiscardChangesModal());
            expect(newStore.showDiscardChangesModal).toBe(false);
        });
    });
});
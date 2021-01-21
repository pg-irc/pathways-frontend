// tslint:disable: no-expression-statement typedef
import { buildDefaultStore, Rating, reducer } from '../reviews';
import { chooseRating, closeDiscardChangesModal, openDiscardChangesModal } from '../reviews/actions';

describe('the reviews reducer', () => {

    describe('the rating state', () => {

        it('is set to a number accepted within the rating enum by the choose rating action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, chooseRating(Rating.Three));
            expect(newStore.rating).toBe(Rating.Three);
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
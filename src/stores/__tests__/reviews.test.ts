// tslint:disable: no-expression-statement typedef
import { aBoolean } from '../../application/helpers/random_test_values';
import { buildDefaultStore, Rating, reducer } from '../reviews';
import { chooseRating, closeDiscardChangesModal, openDiscardChangesModal, setIsSendingReview } from '../reviews/actions';

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

    describe('the is sending state', () => {

        it('is set to boolean value by the set is sending review action', () => {
            const isSending = aBoolean();
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, setIsSendingReview(isSending));
            expect(newStore.isSending).toBe(isSending);
        });
    });
});
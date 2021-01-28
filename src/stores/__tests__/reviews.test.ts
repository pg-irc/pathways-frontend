// tslint:disable: no-expression-statement typedef
import { aBoolean, aString } from '../../application/helpers/random_test_values';
import { buildDefaultStore, Rating, reducer, ReviewsStore } from '../reviews';
import { chooseRating, clearReview, closeDiscardChangesModal, finishServiceReview, openDiscardChangesModal, submitServiceReview } from '../reviews/actions';

describe('the reviews reducer', () => {

    describe('the review store', () => {

        it('is cleared by the clear review action', () => {
            const oldStore: ReviewsStore = {
                rating: Rating.Three,
                showDiscardChangesModal: false,
                isSending: true,
            };
            const newStore = reducer(oldStore, clearReview());
            expect(newStore).toEqual(buildDefaultStore());
        });
    });

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

        it('is set to true by the submit service review action', () => {
            const oldStore = buildDefaultStore();
            const newStore = reducer(oldStore, submitServiceReview(aString(), aString()));
            expect(newStore.isSending).toBe(true);
        });

        it('is set to false by the submit service review action', () => {
            const oldStore: ReviewsStore = {
                rating: Rating.Zero,
                showDiscardChangesModal: aBoolean(),
                isSending: true,
            };
            const newStore = reducer(oldStore, finishServiceReview());
            expect(newStore.isSending).toBe(false);
        });
    });

});
import * as constants from '../../application/constants';
import { ReviewAction } from './actions';

export interface ReviewsStore {
    readonly rating: number;
    readonly showDiscardChangesModal: boolean;
}

export const buildDefaultStore = (): ReviewsStore => ({
    rating: 0,
    showDiscardChangesModal: false,
});

export const reducer = (store: ReviewsStore = buildDefaultStore(), action?: ReviewAction): ReviewsStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.CHOOSE_RATING:
            return {
                ...store,
                rating: action.payload.rating,
            };
        case constants.OPEN_DISCARD_CHANGES_MODAL:
            return {
                ...store,
                showDiscardChangesModal: true,
            };
        case constants.CLOSE_DISCARD_CHANGES_MODAL:
            return {
                ...store,
                showDiscardChangesModal: false,
            };
        default:
            return store;
    }
};
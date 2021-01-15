import * as constants from '../../application/constants';
import { ReviewAction } from './actions';

export interface ReviewsStore {
    readonly rating: number;
}

export const buildDefaultStore = (): ReviewsStore => ({
    rating: 0,
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
        default:
            return store;
    }
}
import * as constants from '../../application/constants';
import { ReviewAction } from './actions';

export enum Rating {
    Zero,
    One,
    Two,
    Three,
}

export interface ServiceReviewPostData {
    readonly serviceId: string;
    readonly userLocale: string;
    readonly rating: Rating;
    readonly comment?: string;
}

export interface ReviewsStore {
    readonly rating: Rating;
    readonly comment: string;
    readonly showDiscardChangesModal: boolean;
    readonly isSending: boolean;
}

export const buildDefaultStore = (): ReviewsStore => ({
    rating: Rating.Zero,
    comment: undefined,
    showDiscardChangesModal: false,
    isSending: false,
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
        case constants.SUBMIT_SERVICE_REVIEW:
            return {
                ...store,
                isSending: true,
            };
        case constants.SAVE_COMMENT:
            return {
                ...store,
                comment: action.payload.comment,
            };
        case constants.FINISH_SERVICE_REVIEW:
            return buildDefaultStore();
        case constants.CLEAR_REVIEW:
            return buildDefaultStore();
        default:
            return store;
    }
};
import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { Rating } from '.';
import { Id } from '../services';

// tslint:disable-next-line: typedef
export const chooseRating = (rating: Rating, serviceId: Id) => (
    helpers.makeAction(constants.CHOOSE_RATING, { rating, serviceId })
);

// tslint:disable-next-line: typedef
export const openDiscardChangesModal = () => (
    helpers.makeAction(constants.OPEN_DISCARD_CHANGES_MODAL)
);

// tslint:disable-next-line: typedef
export const closeDiscardChangesModal = () => (
    helpers.makeAction(constants.CLOSE_DISCARD_CHANGES_MODAL)
);

// tslint:disable-next-line: typedef
export const submitServiceReview = (serviceId: Id, comment: string) => (
    helpers.makeAction(constants.SUBMIT_SERVICE_REVIEW, { serviceId, comment })
);

// tslint:disable-next-line: typedef
export const finishServiceReview = () => (
    helpers.makeAction(constants.FINISH_SERVICE_REVIEW)
);

// tslint:disable-next-line: typedef
export const clearReview = () => (
    helpers.makeAction(constants.CLEAR_REVIEW)
);

// tslint:disable-next-line: typedef
export const saveComment = (comment: string) => (
    helpers.makeAction(constants.SAVE_COMMENT, { comment })
);

export type ChooseRatingAction = Readonly<ReturnType<typeof chooseRating>>;
export type OpenDiscardChangesModalAction = Readonly<ReturnType<typeof openDiscardChangesModal>>;
export type CloseDiscardChangesModalAction  = Readonly<ReturnType<typeof closeDiscardChangesModal>>;
export type SubmitServiceReviewAction = Readonly<ReturnType<typeof submitServiceReview>>;
export type FinishServiceReviewAction = Readonly<ReturnType<typeof finishServiceReview>>;
export type ClearReviewAction = Readonly<ReturnType<typeof clearReview>>;
export type SaveCommentAction = Readonly<ReturnType<typeof saveComment>>;

export type ReviewAction = ChooseRatingAction |
    OpenDiscardChangesModalAction |
    CloseDiscardChangesModalAction |
    SubmitServiceReviewAction |
    ClearReviewAction |
    FinishServiceReviewAction |
    SaveCommentAction;

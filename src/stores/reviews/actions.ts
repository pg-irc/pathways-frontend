import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';
import { Rating } from '.';
import { Id } from '../services';

// tslint:disable-next-line: typedef
export const chooseRating = (rating: Rating) => (
    helpers.makeAction(constants.CHOOSE_RATING, { rating })
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

export type ChooseRatingAction = Readonly<ReturnType<typeof chooseRating>>;
export type OpenDiscardChangesModalAction = Readonly<ReturnType<typeof openDiscardChangesModal>>;
export type CloseDiscardChangesModalAction  = Readonly<ReturnType<typeof closeDiscardChangesModal>>;
export type SubmitServiceReviewAction = Readonly<ReturnType<typeof submitServiceReview >>;

export type ReviewAction = ChooseRatingAction |
    OpenDiscardChangesModalAction |
    CloseDiscardChangesModalAction |
    SubmitServiceReviewAction;

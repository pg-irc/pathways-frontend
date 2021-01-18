import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';

// tslint:disable-next-line: typedef
export const chooseRating = (rating: number) => (
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

export type ChooseRatingAction = Readonly<ReturnType<typeof chooseRating>>;
export type OpenDiscardChangesModalAction = Readonly<ReturnType<typeof openDiscardChangesModal>>;
export type CloseDiscardChangesModalAction  = Readonly<ReturnType<typeof closeDiscardChangesModal>>;

export type ReviewAction = ChooseRatingAction |
    OpenDiscardChangesModalAction |
    CloseDiscardChangesModalAction;

import * as helpers from '../helpers/make_action';
import * as constants from '../../application/constants';

// tslint:disable-next-line: typedef
export const chooseRating = (rating: number) => (
    helpers.makeAction(constants.CHOOSE_RATING, { rating })
);

export type ChooseRatingAction = Readonly<ReturnType<typeof chooseRating>>;

export type ReviewAction = ChooseRatingAction;
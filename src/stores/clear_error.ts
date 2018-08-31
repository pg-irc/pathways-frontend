import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

// tslint:disable-next-line:typedef
export const clearError = () => (
    helpers.makeAction(constants.CLEAR_ERROR_STATE)
);

export type ClearErrorAction = Readonly<ReturnType<typeof clearError>>;

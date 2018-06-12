import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export type OpenLocaleSwitcherAction = Readonly<ReturnType<typeof openLocaleSwitcher>>;

// tslint:disable-next-line:typedef
export const openLocaleSwitcher = (open: boolean) => (
    helpers.makeAction(constants.OPEN_LOCALE_SWITCHER, { open })
);

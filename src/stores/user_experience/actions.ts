import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { SaveLocaleRequestAction } from '../locale/actions';
import { BuildServicesRequestAction } from '../services/actions';

export type SaveBookmarksTabAction = Readonly<ReturnType<typeof saveBookmarksTab>>;
export type SaveOrganizationTabAction = Readonly<ReturnType<typeof saveOrganizationTab>>;
export type CloseHeaderMenuAction = Readonly<ReturnType<typeof closeHeaderMenu>>;
export type OpenHeaderMenuAction = Readonly<ReturnType<typeof openHeaderMenu>>;
export type CloseAboutModalAction = Readonly<ReturnType<typeof closeAboutModal>>;
export type OpenAboutModalAction = Readonly<ReturnType<typeof openAboutModal>>;
export type CloseDisclaimerModalAction = Readonly<ReturnType<typeof closeDisclaimerModal>>;
export type OpenDisclaimerModalAction = Readonly<ReturnType<typeof openDisclaimerModal>>;

export type UserExperienceAction =
SaveBookmarksTabAction |
SaveOrganizationTabAction |
CloseHeaderMenuAction |
OpenHeaderMenuAction |
CloseAboutModalAction |
OpenAboutModalAction |
CloseDisclaimerModalAction |
OpenDisclaimerModalAction |
SaveLocaleRequestAction |
BuildServicesRequestAction;

// tslint:disable-next-line: typedef
export const saveBookmarksTab = (index: number) => (
    helpers.makeAction(constants.SAVE_BOOKMARKS_TAB, {index})
);

// tslint:disable-next-line:typedef
export const saveOrganizationTab = (index: number) => (
    helpers.makeAction(constants.SAVE_ORGANIZATION_TAB, { index })
);

// tslint:disable-next-line: typedef
export const closeHeaderMenu = () => (
    helpers.makeAction(constants.CLOSE_HEADER_MENU)
);

// tslint:disable-next-line: typedef
export const openHeaderMenu = () => (
    helpers.makeAction(constants.OPEN_HEADER_MENU)
);

// tslint:disable-next-line: typedef
export const closeAboutModal = () => (
    helpers.makeAction(constants.CLOSE_ABOUT_MODAL)
);

// tslint:disable-next-line: typedef
export const openAboutModal = () => (
    helpers.makeAction(constants.OPEN_ABOUT_MODAL)
);

// tslint:disable-next-line: typedef
export const closeDisclaimerModal = () => (
    helpers.makeAction(constants.CLOSE_DISCLAIMER_MODAL)
);

// tslint:disable-next-line: typedef
export const openDisclaimerModal = () => (
    helpers.makeAction(constants.OPEN_DISCLAIMER_MODAL)
);

import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { SaveLocaleRequestAction } from '../locale/actions';

export type SaveSearchOffsetAction = Readonly<ReturnType<typeof saveSearchOffset>>;
export type SaveTopicServicesOffsetAction = Readonly<ReturnType<typeof saveTopicServicesOffset>>;
export type SaveBookmarkedServicesOffsetAction = Readonly<ReturnType<typeof saveBookmarkedServicesOffset>>;
export type SaveOrganizationServicesOffsetAction = Readonly<ReturnType<typeof saveOrganizationServicesOffset>>;
export type SaveBookmarksTabAction = Readonly<ReturnType<typeof saveBookmarksTab>>;

export type CloseHeaderMenuAction = Readonly<ReturnType<typeof closeHeaderMenu>>;
export type OpenHeaderMenuAction = Readonly<ReturnType<typeof openHeaderMenu>>;
export type CloseAboutModalAction = Readonly<ReturnType<typeof closeAboutModal>>;
export type OpenAboutModalAction = Readonly<ReturnType<typeof openAboutModal>>;
export type CloseDisclaimerModalAction = Readonly<ReturnType<typeof closeDisclaimerModal>>;
export type OpenDisclaimerModalAction = Readonly<ReturnType<typeof openDisclaimerModal>>;

export type UserExperienceAction =
SaveSearchOffsetAction |
SaveTopicServicesOffsetAction |
SaveBookmarkedServicesOffsetAction |
SaveBookmarksTabAction |
SaveOrganizationServicesOffsetAction |
CloseHeaderMenuAction |
OpenHeaderMenuAction |
CloseAboutModalAction |
OpenAboutModalAction |
CloseDisclaimerModalAction |
OpenDisclaimerModalAction |
SaveLocaleRequestAction;

// tslint:disable-next-line:typedef
export const saveSearchOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_SEARCH_OFFSET, { offset })
);

// tslint:disable-next-line:typedef
export const saveTopicServicesOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_TOPIC_SERVICES_OFFSET, { offset })
);

// tslint:disable-next-line:typedef
export const saveBookmarkedServicesOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_BOOKMARKED_SERVICES_OFFSET, { offset })
);

// tslint:disable-next-line:typedef
export const saveOrganizationServicesOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_ORGANIZATION_SERVICES_OFFSET, { offset })
);

// tslint:disable-next-line: typedef
export const saveBookmarksTab = (index: number) => (
    helpers.makeAction(constants.SAVE_BOOKMARKS_TAB, {index})
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

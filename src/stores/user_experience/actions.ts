import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';
import { SaveLocaleRequestAction } from '../locale/actions';

export type SaveHomePageScrollOffsetAction = Readonly<ReturnType<typeof saveHomePageScrollOffset>>;
export type SaveTopicDetailScrollOffsetAction = Readonly<ReturnType<typeof saveTopicDetailScrollOffset>>;
export type SaveOrganizationServicesOffsetAction = Readonly<ReturnType<typeof saveOrganizationServicesOffset>>;
export type SaveSearchResultScrollOffsetAction = Readonly<ReturnType<typeof saveSearchResultScrollOffset>>;
export type SaveTopicServicesScrollOffsetAction = Readonly<ReturnType<typeof saveTopicServicesScrollOffset>>;
export type SaveBookmarkedServicesScrollOffsetAction = Readonly<ReturnType<typeof saveBookmarkedServicesScrollOffset>>;
export type SaveBookmarksTabAction = Readonly<ReturnType<typeof saveBookmarksTab>>;

export type CloseHeaderMenuAction = Readonly<ReturnType<typeof closeHeaderMenu>>;
export type OpenHeaderMenuAction = Readonly<ReturnType<typeof openHeaderMenu>>;
export type CloseAboutModalAction = Readonly<ReturnType<typeof closeAboutModal>>;
export type OpenAboutModalAction = Readonly<ReturnType<typeof openAboutModal>>;
export type CloseDisclaimerModalAction = Readonly<ReturnType<typeof closeDisclaimerModal>>;
export type OpenDisclaimerModalAction = Readonly<ReturnType<typeof openDisclaimerModal>>;

export type UserExperienceAction =
SaveHomePageScrollOffsetAction |
SaveSearchResultScrollOffsetAction |
SaveTopicServicesScrollOffsetAction |
SaveBookmarkedServicesScrollOffsetAction |
SaveBookmarksTabAction |
SaveOrganizationServicesOffsetAction |
CloseHeaderMenuAction |
OpenHeaderMenuAction |
CloseAboutModalAction |
OpenAboutModalAction |
CloseDisclaimerModalAction |
OpenDisclaimerModalAction |
SaveLocaleRequestAction |
SaveTopicDetailScrollOffsetAction;

// tslint:disable-next-line:typedef
export const saveHomePageScrollOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_HOMEPAGE_SCROLL_OFFSET, { offset })
);

// tslint:disable-next-line:typedef
export const saveTopicDetailScrollOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_TOPIC_DETAIL_SCROLL_OFFSET, { offset })
);

// tslint:disable-next-line:typedef
export const saveSearchResultScrollOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_SEARCH_RESULT_SCROLL_OFFSET, { offset })
);

// tslint:disable-next-line:typedef
export const saveTopicServicesScrollOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_TOPIC_SERVICES_SCROLL_OFFSET, { offset })
);

// tslint:disable-next-line:typedef
export const saveBookmarkedServicesScrollOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_BOOKMARKED_SERVICES_SCROLL_OFFSET, { offset })
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

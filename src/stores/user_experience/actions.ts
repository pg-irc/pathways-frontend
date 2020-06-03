import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

export type SaveSearchOffsetAction = Readonly<ReturnType<typeof saveSearchOffset>>;
export type SaveTopicServicesOffsetAction = Readonly<ReturnType<typeof saveTopicServicesOffset>>;
export type SaveBookmarkedServicesOffsetAction = Readonly<ReturnType<typeof saveBookmarkedServicesOffset>>;
export type SetBookmarksTabAction = Readonly<ReturnType<typeof setBookmarksTab>>;

export type UserExperienceAction =
SaveSearchOffsetAction |
SaveTopicServicesOffsetAction |
SaveBookmarkedServicesOffsetAction |
SetBookmarksTabAction;

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

// tslint:disable-next-line: typedef
export const setBookmarksTab = (index: number) => (
    helpers.makeAction(constants.SET_BOOKMARKS_TAB, {index})
);

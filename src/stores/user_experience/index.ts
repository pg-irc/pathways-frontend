import * as constants from '../../application/constants';
import { UserExperienceAction } from './actions';

export interface UserExperienceStore {
    readonly topicDetailScrollOffset: number;
    readonly organizationServicesScrollOffset: number;
    readonly homepageScrollOffset: number;
    readonly searchResultScrollOffset: number;
    readonly topicServicesScrollOffset: number;
    readonly bookmarkedTopicsScrollOffset: number;
    readonly bookmarkedServicesScrollOffset: number;
    readonly exploreDetailScrollOffset: number;
    readonly bookmarksTab: BookmarksTab;
    readonly organizationTab: number;
    readonly headerMenu: HeaderMenu;
}

export enum BookmarksTab {
    Topics,
    Services,
}

export enum HeaderMenu {
    HeaderMenuIsClosed,
    HeaderMenuIsOpen,
    AboutModalIsOpen,
    DisclaimerModalIsOpen,
}

export const buildDefaultStore = (): UserExperienceStore => ({
    organizationServicesScrollOffset: 0,
    homepageScrollOffset: 0,
    searchResultScrollOffset: 0,
    topicServicesScrollOffset: 0,
    topicDetailScrollOffset: 0,
    bookmarkedTopicsScrollOffset: 0,
    bookmarkedServicesScrollOffset: 0,
    exploreDetailScrollOffset: 0,
    bookmarksTab: BookmarksTab.Topics,
    organizationTab: 0,
    headerMenu: HeaderMenu.HeaderMenuIsClosed,
});

export const reducer = (store: UserExperienceStore = buildDefaultStore(), action?: UserExperienceAction): UserExperienceStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.SAVE_HOMEPAGE_SCROLL_OFFSET:
            return { ...store,
                homepageScrollOffset: action.payload.offset,
            };
        case constants.SAVE_SEARCH_RESULT_SCROLL_OFFSET:
            return {
                ...store,
                searchResultScrollOffset: action.payload.offset,
            };
        case constants.SAVE_TOPIC_DETAIL_SCROLL_OFFSET:
            return {
                ...store,
                topicDetailScrollOffset: action.payload.offset,
            };
        case constants.SAVE_TOPIC_SERVICES_SCROLL_OFFSET:
            return {
                ...store,
                topicServicesScrollOffset: action.payload.offset,
            };
        case constants.SAVE_BOOKMARKED_TOPICS_SCROLL_OFFSET:
            return {
                ...store,
                bookmarkedTopicsScrollOffset: action.payload.offset,
            };
        case constants.SAVE_BOOKMARKED_SERVICES_SCROLL_OFFSET:
            return {
                ...store,
                bookmarkedServicesScrollOffset: action.payload.offset,
            };
        case constants.SAVE_ORGANIZATION_SERVICES_SCROLL_OFFSET:
            return ({
                ...store,
                organizationServicesScrollOffset: action.payload.offset,
            });
        case constants.SAVE_EXPLORE_DETAIL_SCROLL_OFFSET:
            return ({
                ...store,
                exploreDetailScrollOffset: action.payload.offset,
            });
        case constants.SAVE_BOOKMARKS_TAB:
            return updateBookmarksTab(store, action.payload.index);
        case constants.SAVE_ORGANIZATION_TAB:
            return { ...store, organizationTab: action.payload.index };
        case constants.LOAD_SERVICES_REQUEST:
            return { ...store, topicServicesScrollOffset: 0 };
        case constants.OPEN_HEADER_MENU:
        case constants.CLOSE_HEADER_MENU:
        case constants.CLOSE_ABOUT_MODAL:
        case constants.OPEN_ABOUT_MODAL:
        case constants.CLOSE_DISCLAIMER_MODAL:
        case constants.OPEN_DISCLAIMER_MODAL:
        case constants.SAVE_LOCALE_REQUEST:
            return headerMenuReducer(store, action);
        default:
            return store;
    }
};

const updateBookmarksTab = (store: UserExperienceStore, index: number): UserExperienceStore => {
    if (index === 0) {
        return ({
            ...store,
            bookmarksTab: BookmarksTab.Topics,
        });
    }
    return ({
        ...store,
        bookmarksTab: BookmarksTab.Services,
    });
};

const headerMenuReducer = (store: UserExperienceStore, action: UserExperienceAction): UserExperienceStore => {
    switch (action.type) {
        case constants.CLOSE_HEADER_MENU:
            return({
                ...store,
                headerMenu: HeaderMenu.HeaderMenuIsClosed,
            });
        case constants.OPEN_HEADER_MENU:
            return ({
                ...store,
                headerMenu: HeaderMenu.HeaderMenuIsOpen,
            });
        case constants.CLOSE_ABOUT_MODAL:
            return ({
                ...store,
                headerMenu: HeaderMenu.HeaderMenuIsOpen,
            });
        case constants.OPEN_ABOUT_MODAL:
            return ({
                ...store,
                headerMenu: HeaderMenu.AboutModalIsOpen,
            });
        case constants.CLOSE_DISCLAIMER_MODAL:
            return ({
                ...store,
                headerMenu: HeaderMenu.HeaderMenuIsOpen,
            });
        case constants.OPEN_DISCLAIMER_MODAL:
            return ({
                ...store,
                headerMenu: HeaderMenu.DisclaimerModalIsOpen,
            });
        case constants.SAVE_LOCALE_REQUEST:
            return ({
                ...store,
                headerMenu: HeaderMenu.HeaderMenuIsClosed,
            });
        default:
            return store;
    }
};

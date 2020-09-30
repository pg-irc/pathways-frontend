import * as constants from '../../application/constants';
import { UserExperienceAction } from './actions';

export interface UserExperienceStore {
    readonly searchOffset: number;
    readonly topicServicesOffset: number;
    readonly organizationServicesOffset: number;
    readonly bookmarkedServicesOffset: number;
    readonly bookmarksTab: BookmarksTab;
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
    searchOffset: 0,
    topicServicesOffset: 0,
    organizationServicesOffset: 0,
    bookmarkedServicesOffset: 0,
    bookmarksTab: BookmarksTab.Topics,
    headerMenu: HeaderMenu.HeaderMenuIsClosed,
});

export const reducer = (store: UserExperienceStore = buildDefaultStore(), action?: UserExperienceAction): UserExperienceStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.SAVE_SEARCH_OFFSET:
            return ({
                ...store,
                searchOffset: action.payload.offset,
            });
        case constants.SAVE_TOPIC_SERVICES_OFFSET:
            return ({
                ...store,
                topicServicesOffset: action.payload.offset,
            });
        case constants.SAVE_BOOKMARKED_SERVICES_OFFSET:
            return ({
                ...store,
                bookmarkedServicesOffset: action.payload.offset,
            });
        case constants.SAVE_ORGANIZATION_SERVICES_OFFSET:
            return ({
                ...store,
                organizationServicesOffset: action.payload.offset,
            });
        case constants.SAVE_BOOKMARKS_TAB:
            return updateBookmarksTab(store, action.payload.index);
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

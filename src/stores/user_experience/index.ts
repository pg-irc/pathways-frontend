import * as constants from '../../application/constants';
import { UserExperienceAction } from './actions';

export interface UserExperienceStore {
    readonly bookmarksTab: BookmarksTab;
    readonly organizationTab: number;
    readonly headerMenu: HeaderMenu;
    readonly languageDrawer: LanguageDrawer;
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

export enum LanguageDrawer {
    LanguageDrawerIsClosed,
    LanguageDrawerIsOpen,
}

export const buildDefaultStore = (): UserExperienceStore => ({
    bookmarksTab: BookmarksTab.Topics,
    organizationTab: 0,
    headerMenu: HeaderMenu.HeaderMenuIsClosed,
    languageDrawer: LanguageDrawer.LanguageDrawerIsClosed,
});

export const reducer = (store: UserExperienceStore = buildDefaultStore(), action?: UserExperienceAction): UserExperienceStore => {
    if (!action) {
        return store;
    }

    switch (action.type) {
        case constants.SAVE_BOOKMARKS_TAB:
            return updateBookmarksTab(store, action.payload.index);
        case constants.SAVE_ORGANIZATION_TAB:
            return { ...store, organizationTab: action.payload.index };
        case constants.OPEN_LANGUAGE_DRAWER:
            return { ...store, languageDrawer: LanguageDrawer.LanguageDrawerIsOpen };
        case constants.CLOSE_LANGUAGE_DRAWER:
            return { ...store, languageDrawer: LanguageDrawer.LanguageDrawerIsClosed };
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
            return ({
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

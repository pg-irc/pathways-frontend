import * as constants from '../../application/constants';
import { UserExperienceAction } from './actions';

export interface UserExperienceStore {
    readonly searchOffset: number;
    readonly topicServicesOffset: number;
    readonly bookmarkedServicesOffset: number;
    readonly bookmarksTab: BookmarksTab;
}

export enum BookmarksTab {
    Topics,
    Services,
}

export const buildDefaultStore = (): UserExperienceStore => ({
    searchOffset: 0,
    topicServicesOffset: 0,
    bookmarkedServicesOffset: 0,
    bookmarksTab: BookmarksTab.Topics,
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
            case constants.SET_BOOKMARKS_TAB:
                return updateBookmarksTab(store, action.payload.index);
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

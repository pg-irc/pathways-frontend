import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export enum BookmarksTabStore {
    Topics,
    Services,
}

export type SetBookmarksTabAction = Readonly<ReturnType<typeof setBookmarksTab>>;

// tslint:disable-next-line: typedef
export const setBookmarksTab = (index: number) => (
    helpers.makeAction(constants.SET_BOOKMARKS_TAB, {index})
);

export const buildDefaultStore = (): BookmarksTabStore => BookmarksTabStore.Topics;

export const reducer = (store: BookmarksTabStore = buildDefaultStore(), action?: SetBookmarksTabAction): BookmarksTabStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_BOOKMARKS_TAB:
            return updateBookmarksTab(action.payload.index);
        default:
            return store;
    }
};

const updateBookmarksTab = (index: number): BookmarksTabStore => {
    if (index === 0) {
        return BookmarksTabStore.Topics;
    }
    return BookmarksTabStore.Services;
};
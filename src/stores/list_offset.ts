import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export interface ListOffsetStore {
    readonly listOffset: number;
    readonly searchOffset: number;
    readonly topicServicesOffset: number;
    readonly bookmarkedServicesOffset: number;
}

export type SaveListOffsetAction = Readonly<ReturnType<typeof saveListOffset>>;
export type ClearListOffsetAction = Readonly<ReturnType<typeof clearListOffset>>;
export type SaveSearchOffsetAction = Readonly<ReturnType<typeof saveSearchOffset>>;
export type SaveTopicServicesOffsetAction = Readonly<ReturnType<typeof saveTopicServicesOffset>>;
export type SaveBookmarkedServicesOffsetAction = Readonly<ReturnType<typeof saveBookmarkedServicesOffset>>;

export type ListOffsetAction =
SaveListOffsetAction |
ClearListOffsetAction |
SaveSearchOffsetAction |
SaveTopicServicesOffsetAction |
SaveBookmarkedServicesOffsetAction;

// tslint:disable-next-line:typedef
export const saveListOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_LIST_OFFSET, { offset })
);

// tslint:disable-next-line: typedef
export const clearListOffset = () => (
    helpers.makeAction(constants.CLEAR_LIST_OFFSET)
);

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

export const buildDefaultStore = (): ListOffsetStore => ({
    listOffset: 0,
    searchOffset: 0,
    topicServicesOffset: 0,
    bookmarkedServicesOffset: 0,
});

export const reducer = (store: ListOffsetStore = buildDefaultStore(), action?: ListOffsetAction): ListOffsetStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SAVE_LIST_OFFSET:
            return ({
                ...store,
                listOffset: action.payload.offset,
            });
        case constants.CLEAR_LIST_OFFSET:
            return buildDefaultStore();
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
        default:
            return store;
    }
};
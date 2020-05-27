import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export interface ListOffsetStore {
    readonly listOffset: number;
}

export type SaveListOffsetAction = Readonly<ReturnType<typeof saveListOffset>>;
export type ClearListOffsetAction = Readonly<ReturnType<typeof clearListOffset>>;

export type ListOffsetAction = SaveListOffsetAction | ClearListOffsetAction;

// tslint:disable-next-line:typedef
export const saveListOffset = (offset: number) => (
    helpers.makeAction(constants.SAVE_LIST_OFFSET, { offset })
);

// tslint:disable-next-line: typedef
export const clearListOffset = () => (
    helpers.makeAction(constants.CLEAR_LIST_OFFSET)
);

export const buildDefaultStore = (): ListOffsetStore => ({
    listOffset: 0,
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
        default:
            return store;
    }
};
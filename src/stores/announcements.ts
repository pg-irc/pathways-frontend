import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export interface Announcement {
    readonly id: string;
    readonly title: string;
    readonly description: string;
}

export type GetAnnoucementsSuccessAction = Readonly<ReturnType<typeof getAnnoucementsSuccess>>;
export type GetAnnoucementsFailureAction = Readonly<ReturnType<typeof getAnnoucementsFailure>>;

// tslint:disable-next-line:typedef
export const getAnnoucementsSuccess = (announcements: ReadonlyArray<Announcement>) => (
    helpers.makeAction(constants.GET_ANNOUNCEMENTS_SUCCESS, { announcements })
);

// tslint:disable-next-line:typedef
export const getAnnoucementsFailure = (error: string) => (
    helpers.makeAction(constants.GET_ANNOUNCEMENTS_FAILURE, { error })
);

export interface AnnoucementsStore {
    readonly announcements: ReadonlyArray<Announcement>;
}

export const buildDefaultStore = (): AnnoucementsStore => ({
    announcements: [],
});

export const reducer = (store: AnnoucementsStore = buildDefaultStore(), action?: GetAnnoucementsSuccessAction | GetAnnoucementsFailureAction): AnnoucementsStore => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.GET_ANNOUNCEMENTS_SUCCESS:
            return { ...store, announcements: action.payload.announcements };
        default:
            return store;
    }
};
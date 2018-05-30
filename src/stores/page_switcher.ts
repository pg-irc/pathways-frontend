import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export enum Page {
    Questionnaire,
    MyPlan,
    ExploreAll,
}

export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

export type SetMainPageAction = Readonly<ReturnType<typeof setMainPage>>;

export const initialPage = Page.Questionnaire;

// tslint:disable-next-line:typedef
export const setMainPage = (mainPage: Page) => (
    helpers.makeAction(constants.SET_MAIN_PAGE, { mainPage })
);

// tslint:disable-next-line:typedef
const buildDefaultStore = () => (
    { mainPage: initialPage }
);

export const reducer = (store: Store = buildDefaultStore(), action?: SetMainPageAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_MAIN_PAGE:
            return { ...store, mainPage: action.payload.mainPage };
        default:
            return store;
    }
};
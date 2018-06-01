import * as constants from '../application/constants';

export enum Page {
    Questionnaire,
    MyPlan,
    ExploreAll,
}

export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

export const initialPage = Page.Questionnaire;

// tslint:disable-next-line:typedef
const buildDefaultStore = () => (
    { mainPage: initialPage }
);

export const reducer = (store: Store = buildDefaultStore(), action?: any): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_QUESTIONNAIRE_PAGE:
            return { ...store, mainPage: Page.Questionnaire };
        case constants.SET_PLAN_PAGE:
            return { ...store, mainPage: Page.MyPlan };
        case constants.SET_EXPLORE_PAGE:
            return { ...store, mainPage: Page.ExploreAll };
        default:
            return store;
    }
};
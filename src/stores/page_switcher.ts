import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';

export enum Page {
    Questionnaire,
    MyPlan,
    ExploreAll,
}

export const initialPage = Page.Questionnaire;

export type SetQuestionnairePageAction = Readonly<ReturnType<typeof setQuestionnairePage>>;
export type SetPlanPageAction = Readonly<ReturnType<typeof setPlanPage>>;
export type SetExplorePageAction = Readonly<ReturnType<typeof setExplorePage>>;
type PageSwitcherAction = SetQuestionnairePageAction |
                          SetPlanPageAction |
                          SetExplorePageAction;

// tslint:disable-next-line:typedef
export const setQuestionnairePage = () => (
    helpers.makeAction(constants.SET_QUESTIONNAIRE_PAGE)
);

// tslint:disable-next-line:typedef
export const setPlanPage = () => (
    helpers.makeAction(constants.SET_PLAN_PAGE)
);

// tslint:disable-next-line:typedef
export const setExplorePage = () => (
    helpers.makeAction(constants.SET_EXPLORE_PAGE)
);

export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

// tslint:disable-next-line:typedef
const buildDefaultStore = () => (
    { currentPage: initialPage }
);

export const reducer = (store: Store = buildDefaultStore(), action?: PageSwitcherAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_QUESTIONNAIRE_PAGE:
            return { ...store, currentPage: Page.Questionnaire };
        case constants.SET_PLAN_PAGE:
            return { ...store, currentPage: Page.MyPlan };
        case constants.SET_EXPLORE_PAGE:
            return { ...store, currentPage: Page.ExploreAll };
        default:
            return store;
    }
};

export const unsupportedPageError = (page: Page): Error => {
    const message = `${page}: Unsupported Page`;
    return new Error(message);
};
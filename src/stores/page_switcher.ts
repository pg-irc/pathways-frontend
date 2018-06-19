import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { Id } from './tasks';

export enum Page {
    Questionnaire,
    MyPlan,
    ExploreAll,
    ExploreSection,
    TaskDetail,
}

// TODO remove or do someting...
export type PageParameters = string;

export const initialPage = Page.Questionnaire;

export type SetQuestionnairePageAction = Readonly<ReturnType<typeof setQuestionnairePage>>;
export type SetPlanPageAction = Readonly<ReturnType<typeof setPlanPage>>;
export type SetExplorePageAction = Readonly<ReturnType<typeof setExplorePage>>;
export type SetTaskDetailPageAction = Readonly<ReturnType<typeof setTaskDetailPage>>;
export type SetExploreSectionPageAction = Readonly<ReturnType<typeof setExploreSectionPage>>;
type PageSwitcherAction = SetQuestionnairePageAction |
    SetPlanPageAction |
    SetExplorePageAction |
    SetTaskDetailPageAction |
    SetExploreSectionPageAction;

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

// tslint:disable-next-line:typedef
export const setTaskDetailPage = (taskId: Id) => (
    helpers.makeAction(constants.SET_TASK_DETAIL_PAGE, { taskId })
);

// tslint:disable-next-line:typedef
export const setExploreSectionPage = (sectionId: Id) => (
    helpers.makeAction(constants.SET_EXPLORE_SECTION_PAGE, { sectionId })
);

export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

// TODO rename pageParameters to pageId
// TODO rename currentPage to pageType
// tslint:disable-next-line:typedef
const buildDefaultStore = () => (
    { currentPage: initialPage, pageParameters: '' }
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
        case constants.SET_EXPLORE_SECTION_PAGE:
            // TODO this should update the route in the store
            return {
                ...store,
                currentPage: Page.ExploreSection,
                pageParameters: action.payload.sectionId,
            };
        case constants.SET_TASK_DETAIL_PAGE:
            return {
                ...store,
                currentPage: Page.TaskDetail,
                pageParameters: action.payload.taskId,
            };
        default:
            return store;
    }
};

export const unsupportedPageError = (page: Page): Error => {
    const message = `${page}: Unsupported Page`;
    return new Error(message);
};
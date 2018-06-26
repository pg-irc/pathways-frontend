import * as constants from '../application/constants';
import * as helpers from './helpers/make_action';
import { Id } from './tasks';
import { Id as ArticleId } from './articles';

export enum Page {
    Questionnaire,
    MyPlan,
    ExploreAll,
    ExploreSection,
    TaskDetail,
    ArticleDetail,
}

export const initialPage = Page.Questionnaire;

export type SetQuestionnairePageAction = Readonly<ReturnType<typeof setQuestionnairePage>>;
export type SetPlanPageAction = Readonly<ReturnType<typeof setPlanPage>>;
export type SetExplorePageAction = Readonly<ReturnType<typeof setExplorePage>>;
export type SetTaskDetailPageAction = Readonly<ReturnType<typeof setTaskDetailPage>>;
export type SetExploreSectionPageAction = Readonly<ReturnType<typeof setExploreSectionPage>>;
export type SetArticleDetailPageAction = Readonly<ReturnType<typeof setArticleDetailPage>>;
type PageSwitcherAction = SetQuestionnairePageAction |
    SetPlanPageAction |
    SetExplorePageAction |
    SetTaskDetailPageAction |
    SetExploreSectionPageAction |
    SetArticleDetailPageAction;

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

// tslint:disable-next-line:typedef
export const setArticleDetailPage = (articleId: ArticleId) => (
    helpers.makeAction(constants.SET_ARTICLE_DETAIL_PAGE, { articleId })
);

export type Store = Readonly<ReturnType<typeof buildDefaultStore>>;

// tslint:disable-next-line:typedef
const buildDefaultStore = () => (
    { pageType: initialPage, pageId: '' }
);

export const reducer = (store: Store = buildDefaultStore(), action?: PageSwitcherAction): Store => {
    if (!action) {
        return store;
    }
    switch (action.type) {
        case constants.SET_QUESTIONNAIRE_PAGE:
            return { ...store, pageType: Page.Questionnaire };
        case constants.SET_PLAN_PAGE:
            return { ...store, pageType: Page.MyPlan };
        case constants.SET_EXPLORE_PAGE:
            return { ...store, pageType: Page.ExploreAll };
        case constants.SET_EXPLORE_SECTION_PAGE:
            return {
                ...store,
                pageType: Page.ExploreSection,
                pageId: action.payload.sectionId,
            };
        case constants.SET_TASK_DETAIL_PAGE:
            return {
                ...store,
                pageType: Page.TaskDetail,
                pageId: action.payload.taskId,
            };
        case constants.SET_ARTICLE_DETAIL_PAGE:
            return {
                ...store,
                pageType: Page.ArticleDetail,
                pageId: action.payload.articleId,
            };
        default:
            return store;
    }
};

export const unsupportedPageError = (page: Page): Error => {
    const message = `${page}: Unsupported Page`;
    return new Error(message);
};
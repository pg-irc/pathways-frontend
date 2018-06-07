// tslint:disable:no-expression-statement

import * as pageSwitcher from '../page_switcher';
import * as constants from '../../application/constants';
import { aString } from '../../application/__tests__/helpers/random_test_values';

const buildStore = (): pageSwitcher.Store => (
    pageSwitcher.reducer(undefined, undefined)
);

describe('the initial page', () => {
    it('should be set to Page.Questionnaire', () => {
        expect(pageSwitcher.initialPage).toBe(pageSwitcher.Page.Questionnaire);
    });
});

describe('setting the questionnaire page', () => {
    it('should create action with type SET_QUESTIONNAIRE_PAGE', () => {
        const theAction = pageSwitcher.setQuestionnairePage();
        expect(theAction.type).toBe(constants.SET_QUESTIONNAIRE_PAGE);
    });
});

describe('setting the plan page', () => {
    it('should create action with type SET_PLAN_PAGE', () => {
        const theAction = pageSwitcher.setPlanPage();
        expect(theAction.type).toBe(constants.SET_PLAN_PAGE);
    });
});

describe('setting the explore page', () => {
    it('should create action with type SET_EXPLORE_PAGE', () => {
        const theAction = pageSwitcher.setExplorePage();
        expect(theAction.type).toBe(constants.SET_EXPLORE_PAGE);
    });
});

describe('setting the task detail page', () => {
    it('should create action with type SET_TASK_DETAIL_PAGE', () => {
        const theAction = pageSwitcher.setTaskDetailPage(aString());
        expect(theAction.type).toBe(constants.SET_TASK_DETAIL_PAGE);
    });
});

describe('the reducer', () => {
    it('should default to build a store with a currentPage property', () => {
        const theStore = pageSwitcher.reducer();
        expect(theStore).toHaveProperty('currentPage');
    });

    it('should default to build a store with a pageParameters property', () => {
        const theStore = pageSwitcher.reducer();
        expect(theStore).toHaveProperty('pageParameters');
    });

    it('should default to build a store with currentPage equal to Page.Questionnaire', () => {
        const theStore = pageSwitcher.reducer();
        expect(theStore.currentPage).toBe(pageSwitcher.Page.Questionnaire);
    });

    it('when called with SET_QUESTIONNAIRE_PAGE should return store with currentPage = Page.Questionnaire', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_QUESTIONNAIRE_PAGE as typeof constants.SET_QUESTIONNAIRE_PAGE,
        };
        const theNewStore = pageSwitcher.reducer(theStore, theAction);
        expect(theNewStore.currentPage).toBe(pageSwitcher.Page.Questionnaire);
    });

    it('when called with SET_PLAN_PAGE should return store with currentPage = Page.MyPlan', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_PLAN_PAGE as typeof constants.SET_PLAN_PAGE,
        };
        const theNewStore = pageSwitcher.reducer(theStore, theAction);
        expect(theNewStore.currentPage).toBe(pageSwitcher.Page.MyPlan);
    });

    it('when called with SET_EXPLORE_PAGE should return store with currentPage = Page.ExploreAll', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_EXPLORE_PAGE as typeof constants.SET_EXPLORE_PAGE,
        };
        const theNewStore = pageSwitcher.reducer(theStore, theAction);
        expect(theNewStore.currentPage).toBe(pageSwitcher.Page.ExploreAll);
    });

    it('when called with SET_TASK_DETAIL_PAGE should return store with currentPage = Page.TaskDetail', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_TASK_DETAIL_PAGE as typeof constants.SET_TASK_DETAIL_PAGE,
            payload: {taskId: aString()},
        };
        const theNewStore = pageSwitcher.reducer(theStore, theAction);
        expect(theNewStore.currentPage).toBe(pageSwitcher.Page.TaskDetail);
    });

    it('should return store unchanged if action is undefined', () => {
        const theOriginalStore = buildStore();
        const theNewStore = pageSwitcher.reducer(theOriginalStore, undefined);
        expect(theNewStore.currentPage).toBe(theOriginalStore.currentPage);
    });
});

describe('the unsupportedPageError', () => {
    it('should create an Error', () => {
        const result = pageSwitcher.unsupportedPageError(pageSwitcher.Page.ExploreAll);
        expect(result.name).toBe('Error');
    });

    it('should create an Error with the message [Error: 2: Unsupported Page]', () => {
        const result = pageSwitcher.unsupportedPageError(pageSwitcher.Page.ExploreAll);
        expect(result.message).toBe('2: Unsupported Page');
    });
});

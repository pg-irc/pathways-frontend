// tslint:disable:no-expression-statement
// tslint:disable:no-let

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
    it('should create action with type page id', () => {
        const theId = aString();
        const theAction = pageSwitcher.setTaskDetailPage(theId);
        expect(theAction.payload.taskId).toBe(theId);
    });
});

describe('setting the explore section page', () => {
    it('should create action with type SET_EXPLORE_SECTION_PAGE', () => {
        const theAction = pageSwitcher.setExploreSectionPage(aString());
        expect(theAction.type).toBe(constants.SET_EXPLORE_SECTION_PAGE);
    });
    it('should create action with section page id', () => {
        const theId = aString();
        const theAction = pageSwitcher.setExploreSectionPage(theId);
        expect(theAction.payload.sectionId).toBe(theId);
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

    describe('when called with SET_EXPLORE_SECTION_PAGE ', () => {

        let theId: string = '';
        let theNewStore: pageSwitcher.Store = undefined;

        beforeEach(() => {
            const theStore = buildStore();
            theId = aString();
            const theAction = {
                type: constants.SET_EXPLORE_SECTION_PAGE as typeof constants.SET_EXPLORE_SECTION_PAGE,
                payload: { sectionId: theId },
            };
            theNewStore = pageSwitcher.reducer(theStore, theAction);
        });
        it('should return store with current page = SET_EXPLORE_SECTION_PAGE', () => {
            expect(theNewStore.currentPage).toBe(pageSwitcher.Page.ExploreSection);
        });
        it('should return a store with the current section id', () => {
            expect(theNewStore.pageParameters).toEqual({ sectionId: theId });
        });
    });

    describe('when called with SET_TASK_DETAIL_PAGE', () => {

        let theId: string = '';
        let theNewStore: pageSwitcher.Store = undefined;

        beforeEach(() => {
            theId = aString();
            const theStore = buildStore();
            const theAction = {
                type: constants.SET_TASK_DETAIL_PAGE as typeof constants.SET_TASK_DETAIL_PAGE,
                payload: { taskId: theId },
            };
            theNewStore = pageSwitcher.reducer(theStore, theAction);
        });
        it('should return store with currentPage = Page.TaskDetail', () => {
            expect(theNewStore.currentPage).toBe(pageSwitcher.Page.TaskDetail);
        });
        it('should return store with the current task id', () => {
            expect(theNewStore.pageParameters).toEqual({ taskId: theId });
        });
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

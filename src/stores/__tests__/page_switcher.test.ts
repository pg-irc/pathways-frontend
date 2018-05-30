// tslint:disable:no-expression-statement

import * as pageSwitcher from '../page_switcher';
import * as constants from '../../application/constants';
import * as helpers from '../helpers/make_action';

const buildStore = (): pageSwitcher.Store => (
    pageSwitcher.reducer(undefined, undefined)
);

const buildStoreWithValue = (mainPage: pageSwitcher.Page): pageSwitcher.Store => {
    const action = helpers.makeAction(constants.SET_MAIN_PAGE, { mainPage });
    return pageSwitcher.reducer(undefined, action);
};

describe('the initial page', () => {
    it('should be set to Page.Questionnaire', () => {
        expect(pageSwitcher.initialPage).toBe(pageSwitcher.Page.Questionnaire);
    });
});

describe('setting the main page', () => {

    it('should create action with type SET_MAIN_PAGE', () => {
        const theAction = pageSwitcher.setMainPage(pageSwitcher.Page.ExploreAll);
        expect(theAction.type).toBe(constants.SET_MAIN_PAGE);
    });

    it('should create action with page id as passed to the action creator', () => {
        const theAction = pageSwitcher.setMainPage(pageSwitcher.Page.ExploreAll);
        expect(theAction.payload.mainPage).toBe(pageSwitcher.Page.ExploreAll);
    });
});

describe('the reducer', () => {
    it('should default to build a store with Page.Questionnaire', () => {
        const theStore = pageSwitcher.reducer();
        expect(theStore.mainPage).toBe(pageSwitcher.Page.Questionnaire);
    });

    it('when called with SET_MAIN_PAGE should return store with value from action', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_MAIN_PAGE as typeof constants.SET_MAIN_PAGE,
            payload: { mainPage: pageSwitcher.Page.MyPlan },
        };
        const theNewStore = pageSwitcher.reducer(theStore, theAction);
        expect(theNewStore.mainPage).toBe(theAction.payload.mainPage);
    });

    it('should return store unchanged if action is undefined', () => {
        const theOriginalStore = buildStoreWithValue(pageSwitcher.Page.MyPlan);
        const theNewStore = pageSwitcher.reducer(theOriginalStore, undefined);
        expect(theNewStore.mainPage).toBe(theOriginalStore.mainPage);
    });

    it('should update the store if the payload contains a valid string', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_MAIN_PAGE as typeof constants.SET_MAIN_PAGE,
            payload: { mainPage: pageSwitcher.Page.MyPlan },
        };
        const theNewStore = pageSwitcher.reducer(theStore, theAction);
        expect(theNewStore.mainPage).toBe(pageSwitcher.Page.MyPlan);
    });

    it('should throw if the payload contains an invalid string', () => {
        const theStore = buildStore();
        const theAction = {
            type: constants.SET_MAIN_PAGE as typeof constants.SET_MAIN_PAGE,
            payload: { mainPage: null as pageSwitcher.Page },
        };
        expect(() => pageSwitcher.reducer(theStore, theAction)).toThrow(
            /MainPage.Invalid: Invalid main page id, accepted values are "questionnaire", "plan", or "explore"/,
        );
    });
});

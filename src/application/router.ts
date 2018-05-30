import { Reducer, createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as reduxFirstRouter from 'redux-first-router';
import createMemoryHistory from 'history/createMemoryHistory';
import * as constants from '../application/constants';
import { Store as StoreForApplicationState } from '../stores';
import { Page, initialPage } from '../stores/page_switcher';


const getPageFromRoute = (pageRoute: string): Page => {
    switch (pageRoute) {
        case 'questionnaire': return Page.Questionnaire;
        case 'plan': return Page.MyPlan;
        case 'explore': return Page.ExploreAll;
        default: throw invalidPageRouteError(pageRoute);
    }
};

const getRouteFromPage = (page: Page): string => {
    switch (page) {
        case Page.Questionnaire: return 'questionnaire';
        case Page.MyPlan: return 'plan';
        case Page.ExploreAll: return 'explore';
        default: throw invalidPageError(page);
    }
};

const routesMap = {
    [constants.SET_MAIN_PAGE]: {
        path:'/page/:mainPage',
        toPath: getRouteFromPage,
        fromPath: getPageFromRoute
    }
};

export const createStoreWithRouter = (reducerForApplicationState: Reducer<StoreForApplicationState>) => {
    const history = createMemoryHistory({
        initialEntries: ['/page/' + initialPage],
    });
    const router = reduxFirstRouter.connectRoutes(history, routesMap);
    const rootReducer = combineReducers({ location: router.reducer, applicationState: reducerForApplicationState });
    return createStore(rootReducer, compose(router.enhancer, applyMiddleware(router.middleware)));
};

const invalidPageRouteError = (pageRoute: string): Error => {
    const message = `${pageRoute}: Invalid main page route, accepted values are "questionnaire", "plan", or "explore"`;
    return new Error(message);
};

const invalidPageError = (page: Page): Error => {
    const message = `${page}: Invalid main page, accepted values are Page.Questionnaire, Page.MyPlan, or Page.ExploreAll`;
    return new Error(message);
};
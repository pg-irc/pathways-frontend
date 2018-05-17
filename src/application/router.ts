import { Reducer, createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as reduxFirstRouter from 'redux-first-router';
import createMemoryHistory from 'history/createMemoryHistory';
import * as constants from '../application/constants';
import { Store as StoreForApplicationState } from '../stores';
import { initialPage } from '../stores/page_switcher';

const routesMap = {
    [constants.SET_MAIN_PAGE]: '/page/:mainPage',
};

export const createStoreWithRouter = (reducerForApplicationState: Reducer<StoreForApplicationState>) => {
    const history = createMemoryHistory({
        initialEntries: [routesMap[constants.SET_MAIN_PAGE].replace(':mainPage', String(initialPage))],
    });
    const router = reduxFirstRouter.connectRoutes(history, routesMap);
    const rootReducer = combineReducers({ location: router.reducer, applicationState: reducerForApplicationState });
    return createStore(rootReducer, compose(router.enhancer, applyMiddleware(router.middleware)));
};

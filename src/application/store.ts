import { createStore, compose, applyMiddleware, combineReducers } from 'redux';

import { reducer as reducerForApplicationState, Store as StoreForApplicationState } from '../stores';
import { buildSaga, runSaga } from '../sagas';
import { buildRouter } from './router';

import { loadFontsActions } from '../stores/fonts';
import { loadCurrentLocaleActions } from '../stores/locale';

export type Store = {
    readonly applicationState: StoreForApplicationState,
};

const router = buildRouter();
const saga = buildSaga();

const reducer = combineReducers({ location: router.reducer, applicationState: reducerForApplicationState });
const middleware = applyMiddleware(router.middleware, saga.middleware);
export const store = createStore(reducer, compose(router.enhancer, middleware));

runSaga(saga.middleware); // tslint:disable-line:no-expression-statement
// tslint:disable-next-line:no-expression-statement
store.dispatch(loadFontsActions.request({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
}));
store.dispatch(loadCurrentLocaleActions.request()); // tslint:disable-line:no-expression-statement

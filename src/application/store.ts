import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools as compose } from 'remote-redux-devtools';

import { reducer as reducerForApplicationState, Store as StoreForApplicationState } from '../stores';
import { buildSaga, runSaga } from '../sagas';
import { buildRouter } from './router';

import { loadFontsActions } from '../stores/fonts';
import { Store as LocaleStore, buildDefaultStore as buildDefaultLocaleStore, loadCurrentLocaleActions } from '../stores/locale';

import { LocaleManager } from '../locale';
import enMessages from '../../locale/en/messages';
import arMessages from '../../locale/ar/messages';
import zhMessages from '../../locale/zh/messages';
// tslint:disable-next-line:no-expression-statement
LocaleManager.registerLocales([
    { code: 'en', label: 'English', catalog: enMessages, isRTL: false },
    { code: 'ar', label: 'Arabic', catalog: arMessages, isRTL: true },
    { code: 'zh', label: 'Chinese', catalog: zhMessages, isRTL: false },
]);

export type Store = {
    readonly applicationState: StoreForApplicationState,
};

const router = buildRouter();
const saga = buildSaga();
const middleware = applyMiddleware(router.middleware, saga.middleware);

const enhancers = compose(router.enhancer, middleware);
const reducer = combineReducers({ location: router.reducer, applicationState: reducerForApplicationState });

const preloadedState: { readonly locale: LocaleStore } = {
    locale: {
        ... buildDefaultLocaleStore(),
        fallback: LocaleManager.getFallbackLocale().code,
    },
};
export const store = createStore(reducer, preloadedState, enhancers);

runSaga(saga.middleware); // tslint:disable-line:no-expression-statement
// tslint:disable-next-line:no-expression-statement
store.dispatch(loadFontsActions.request({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
}));
store.dispatch(loadCurrentLocaleActions.request()); // tslint:disable-line:no-expression-statement

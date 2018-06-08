import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools as compose } from 'remote-redux-devtools';

import { reducer as reducerForApplicationState, Store as StoreForApplicationState } from '../stores';
import { runSaga, ApplicationSaga } from '../sagas';
import { ApplicationRouter } from './router';

import { loadFontsActions } from '../stores/fonts';
import * as locale from '../stores/locale';

import { LocaleDefinitionManager } from '../locale';
import enMessages from '../../locale/en/messages';
import arMessages from '../../locale/ar/messages';
import zhMessages from '../../locale/zh/messages';

// tslint:disable-next-line:no-expression-statement
LocaleDefinitionManager.register([
    { code: 'en', label: 'English', catalog: enMessages, isRTL: false },
    { code: 'ar', label: 'Arabic', catalog: arMessages, isRTL: true },
    { code: 'zh', label: 'Chinese', catalog: zhMessages, isRTL: false },
]);

export type Store = { readonly applicationState: StoreForApplicationState };

type InitialState = { readonly applicationState: { readonly localeInStore: locale.Store } };

export function buildStore(router: ApplicationRouter, saga: ApplicationSaga): ReturnType<typeof createStore> {
    const middleware = applyMiddleware(router.middleware, saga.middleware);
    const reducer = combineReducers({ location: router.reducer, applicationState: reducerForApplicationState });
    const preloadedState: InitialState = {
        applicationState: {
            localeInStore: {
                ...locale.buildDefaultStore(),
                fallback: LocaleDefinitionManager.getFallback().code,
            },
        },
    };
    const enhancers = compose(router.enhancer, middleware);
    return createStore(reducer, preloadedState, enhancers);
}

export function startApplication(saga: ApplicationSaga, store: ReturnType<typeof createStore>): void {
    // tslint:disable:no-expression-statement
    runSaga(saga.middleware);
    store.dispatch(loadFontsActions.request({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }));
    store.dispatch(locale.loadCurrentLocaleActions.request());
}
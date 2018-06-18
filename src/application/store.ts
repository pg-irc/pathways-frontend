import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools as compose } from 'remote-redux-devtools';

import { reducer as reducerForApplicationState, Store as StoreForApplicationState } from '../stores';
import { runSaga, ApplicationSaga } from '../sagas';
import { ApplicationRouter } from './router';

import { loadFontsActions } from '../stores/fonts';
import * as locale from '../stores/locale';

import { LocaleInfoManager } from '../locale';
import enMessages from '../../locale/en/messages';
import arMessages from '../../locale/ar/messages';
import zhMessages from '../../locale/zh/messages';

// tslint:disable-next-line:no-expression-statement
LocaleInfoManager.register([
    { code: 'en', label: 'English', catalog: enMessages, isRTL: false },
    { code: 'ar', label: 'عربى', catalog: arMessages, isRTL: true },
    { code: 'zh', label: '中文', catalog: zhMessages, isRTL: false },
    { code: 'a', label: 'A', catalog: enMessages, isRTL: false },
    { code: 'b', label: 'B', catalog: arMessages, isRTL: true },
    { code: 'c', label: 'C', catalog: zhMessages, isRTL: false },
    { code: 'd', label: 'D', catalog: enMessages, isRTL: false },
    { code: 'e', label: 'E', catalog: arMessages, isRTL: true },
    { code: 'f', label: 'F', catalog: zhMessages, isRTL: false },
    { code: 'g', label: 'G', catalog: enMessages, isRTL: false },
    { code: 'h', label: 'H', catalog: arMessages, isRTL: true },
    { code: 'i', label: 'I', catalog: zhMessages, isRTL: false },
    { code: 'j', label: 'J', catalog: enMessages, isRTL: false },
    { code: 'k', label: 'K', catalog: arMessages, isRTL: true },
    { code: 'l', label: 'L', catalog: zhMessages, isRTL: false },
    { code: 'm', label: 'M', catalog: enMessages, isRTL: false },
    { code: 'n', label: 'N', catalog: arMessages, isRTL: true },
    { code: 'o', label: 'O', catalog: zhMessages, isRTL: false },
    { code: 'p', label: 'P', catalog: enMessages, isRTL: false },
    { code: 'q', label: 'Q', catalog: arMessages, isRTL: true },
    { code: 'r', label: 'R', catalog: zhMessages, isRTL: false },
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
                availableLocales: LocaleInfoManager.all,
                fallback: LocaleInfoManager.getFallback().code,
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
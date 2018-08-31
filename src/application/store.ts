import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools as compose } from 'remote-redux-devtools';

import { reducer } from '../stores';
import { runSaga, ApplicationSaga } from '../sagas';

import { loadFontsActions } from '../stores/fonts';
import * as locale from '../stores/locale';
import { UserDataPersistence } from '../stores/user_data';

import { LocaleInfoManager } from '../locale';
import enMessages from '../../locale/en/messages';
import arMessages from '../../locale/ar/messages';
import frMessages from '../../locale/fr/messages';

// tslint:disable-next-line:no-expression-statement
LocaleInfoManager.register([
    { code: 'en', label: 'English', catalog: enMessages, isRTL: false },
    { code: 'ar', label: 'عربى', catalog: arMessages, isRTL: true },
    { code: 'fr', label: 'Français', catalog: frMessages, isRTL: false },
]);

type InitialState = { readonly localeInStore: locale.LocaleStore };

export function buildStore(saga: ApplicationSaga): ReturnType<typeof createStore> {
    const middleware = applyMiddleware(saga.middleware);
    const preloadedState: InitialState = {
        localeInStore: {
            ...locale.buildDefaultStore(),
            availableLocales: LocaleInfoManager.all,
            fallback: LocaleInfoManager.getFallback().code,
        },
    };
    const enhancers = compose(middleware);
    return createStore(reducer, preloadedState, enhancers);
}

export function startApplication(saga: ApplicationSaga, store: ReturnType<typeof createStore>): void {
    // tslint:disable:no-expression-statement
    runSaga(saga.middleware);
    store.dispatch(loadFontsActions.request({
        Roboto: require('../../assets/fonts/Roboto.ttf'),
        Roboto_medium: require('../../assets/fonts/Roboto_medium.ttf'),
    }));
    store.dispatch(locale.loadCurrentLocaleActions.request());
    store.dispatch(UserDataPersistence.loadRequest());
}

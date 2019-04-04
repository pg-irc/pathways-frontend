import { createStore, applyMiddleware, compose } from 'redux';

import { reducer, Store, buildDefaultStore } from '../stores';
import { runSaga, ApplicationSaga } from '../sagas';

import { loadFontsActions } from '../stores/fonts';
import { loadCurrentLocaleActions } from '../stores/locale';
import { UserDataPersistence } from '../stores/user_data';

import { LocaleInfoManager } from '../locale';
import arMessages from '../../locale/ar/messages';
import enMessages from '../../locale/en/messages';
import frMessages from '../../locale/fr/messages';
import koMessages from '../../locale/ko/messages';
import paMessages from '../../locale/pa/messages';
import zhCnMessages from '../../locale/zh_CN/messages';

// tslint:disable-next-line:no-expression-statement
LocaleInfoManager.register([
    { code: 'ar', label: 'عربى', catalog: arMessages, isRTL: true },
    { code: 'en', label: 'English', catalog: enMessages, isRTL: false },
    { code: 'fr', label: 'Français', catalog: frMessages, isRTL: false },
    { code: 'ko', label: '한국어', catalog: koMessages, isRTL: false },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', catalog: paMessages, isRTL: false },
    { code: 'zh_CN', label: '简体中文', catalog: zhCnMessages, isRTL: false },
]);

const buildStoreWithLocaleData = (): Store => {
    const defaultStore = buildDefaultStore();
    return {
        ...defaultStore,
        localeInStore: {
            ...defaultStore.localeInStore,
            availableLocales: LocaleInfoManager.all,
            fallback: LocaleInfoManager.getFallback().code,
        },
    };
};

type CreatedStore = Readonly<ReturnType<typeof createStore>>;

export const buildStore = (saga: ApplicationSaga): CreatedStore => {
    const middleware = applyMiddleware(saga.middleware);
    const store = buildStoreWithLocaleData();
    const enhancers = compose(middleware);
    return createStore(reducer, store, enhancers);
};

export function startApplication(saga: ApplicationSaga, store: CreatedStore): void {
    // tslint:disable:no-expression-statement
    runSaga(saga.middleware);
    store.dispatch(loadFontsActions.request({
        AvenirBook: require('../../assets/fonts/Avenir-Book.ttf'),
        AvenirBlack: require('../../assets/fonts/Avenir-Black.ttf'),
        Roboto: require('../../assets/fonts/Roboto.ttf'),
        Roboto_medium: require('../../assets/fonts/Roboto_medium.ttf'),
    }));
    store.dispatch(loadCurrentLocaleActions.request());
    store.dispatch(UserDataPersistence.loadRequest());
}

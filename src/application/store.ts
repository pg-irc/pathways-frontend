import { createStore, applyMiddleware, compose } from 'redux';

import { reducer, Store, buildDefaultStore } from '../stores';
import * as analytics from '../middleware/analytics';
import { runSaga, ApplicationSaga } from '../sagas';

import { loadFontsActions } from '../stores/fonts';
import { loadLocaleRequest } from '../stores/locale/actions';
import { DataPersistence } from '../stores/persisted_data';
import { request as requestPushNotificationPost } from '../sagas/post_push_notification_token';

import { LocaleInfoManager } from '../locale';
import arMessages from '../../locale/ar/messages';
import enMessages from '../../locale/en/messages';
import frMessages from '../../locale/fr/messages';
import koMessages from '../../locale/ko/messages';
import paMessages from '../../locale/pa/messages';
import tlMessages from '../../locale/tl/messages';
import zhCnMessages from '../../locale/zh_CN/messages';
import zhTwMessages from '../../locale/zh_TW/messages';

// tslint:disable-next-line:no-expression-statement
LocaleInfoManager.register([
    { code: 'en', label: 'English', catalog: enMessages },
    { code: 'ar', label: 'عربى', catalog: arMessages },
    { code: 'fr', label: 'Français', catalog: frMessages },
    { code: 'ko', label: '한국어', catalog: koMessages },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', catalog: paMessages },
    { code: 'tl', label: 'Tagalog', catalog: tlMessages },
    { code: 'zh_CN', label: '简体中文', catalog: zhCnMessages },
    { code: 'zh_TW', label: '繁體中文', catalog: zhTwMessages },
]);

const buildStoreWithLocaleData = (): Store => {
    const defaultStore = buildDefaultStore();
    return {
        ...defaultStore,
        locale: {
            ...defaultStore.locale,
            availableLocales: LocaleInfoManager.all(),
            fallback: LocaleInfoManager.getFallback().code,
        },
    };
};

type CreatedStore = Readonly<ReturnType<typeof createStore>>;

export const buildStore = (saga: ApplicationSaga): CreatedStore => {
    const middleware = applyMiddleware(saga.middleware, analytics.middleware);
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
    store.dispatch(loadLocaleRequest());
    store.dispatch(DataPersistence.loadRequest());
    store.dispatch(requestPushNotificationPost());
}

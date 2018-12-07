import { createStore, applyMiddleware, compose } from 'redux';

import { reducer, Store } from '../stores';
import { runSaga, ApplicationSaga } from '../sagas';

import * as fonts from '../stores/fonts';
import * as locale from '../stores/locale';
import * as questionnaire from '../stores/questionnaire';
import * as tasks from '../stores/tasks';
import * as services from '../stores/services';
import * as explore from '../stores/explore';
import * as taxonomies from '../stores/taxonomies';
import * as notifications from '../stores/notifications';

import { loadFontsActions } from '../stores/fonts';
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

const buildDefaultStore = (): Store => ({
    localeInStore: locale.buildStore(LocaleInfoManager.all, LocaleInfoManager.getFallback().code),
    fontsInStore: fonts.buildDefaultStore(),
    questionnaireInStore: questionnaire.buildDefaultStore(),
    tasksInStore: tasks.buildDefaultStore(),
    servicesInStore: services.buildDefaultStore(),
    exploreSectionsInStore: explore.buildDefaultStore(),
    taxonomiesInStore: taxonomies.buildDefaultStore(),
    notificationsInStore: notifications.buildDefaultStore(),
});

type CreatedStore = Readonly<ReturnType<typeof createStore>>;

export const buildStore = (saga: ApplicationSaga): CreatedStore => {
    const middleware = applyMiddleware(saga.middleware);
    const defaultStore: Store = buildDefaultStore();
    const enhancers = compose(middleware);
    return createStore(reducer, defaultStore, enhancers);
};

export function startApplication(saga: ApplicationSaga, store: CreatedStore): void {
    // tslint:disable:no-expression-statement
    runSaga(saga.middleware);
    store.dispatch(loadFontsActions.request({
        Roboto: require('../../assets/fonts/Roboto.ttf'),
        Roboto_medium: require('../../assets/fonts/Roboto_medium.ttf'),
    }));
    store.dispatch(locale.loadCurrentLocaleActions.request());
    store.dispatch(UserDataPersistence.loadRequest());
}

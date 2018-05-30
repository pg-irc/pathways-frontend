import React from 'react';
import { Provider } from 'react-redux';
import * as main from '../components/main';
import { store } from './store';
import { ErrorBoundary } from './error_boundary';
import { ConnectedI18nProvider } from '../components/i18n_provider';

import { LocaleManager } from './locale';
import enMessages from '../../locale/en/messages';
import arMessages from '../../locale/ar/messages';
import zhMessages from '../../locale/zh/messages';
// tslint:disable-next-line:no-expression-statement
LocaleManager.registerLocales([
    { code: 'en', label: 'English', catalog: enMessages, isRTL: false },
    { code: 'ar', label: 'Arabic', catalog: arMessages, isRTL: true },
    { code: 'zh', label: 'Chinese', catalog: zhMessages, isRTL: false },
]);

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedI18nProvider>
                <main.ConnectedComponent />
            </ConnectedI18nProvider>
        </Provider>
    </ErrorBoundary>
);

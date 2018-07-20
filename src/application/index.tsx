import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import * as main from '../components/main';
import { buildStore, startApplication } from './store';
import { ErrorBoundary } from './error_boundary';
import { ConnectedI18nProvider } from '../components/i18n_provider';
import { buildSaga } from '../sagas';
import { buildRouter } from './router';

import { API_URL } from 'react-native-dotenv';
import { API } from '../api';
API.configure(API_URL); // tslint:disable-line:no-expression-statement

const router = buildRouter();
const saga = buildSaga();
const store = buildStore(router, saga);
startApplication(saga, store); // tslint:disable-line:no-expression-statement

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedI18nProvider>
                <NativeRouter>
                    <main.ConnectedComponent />
                </NativeRouter>
            </ConnectedI18nProvider>
        </Provider>
    </ErrorBoundary>
);

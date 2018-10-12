import React from 'react';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { MainConnectedComponent } from '../components/main/main_connected_component';
import { buildStore, startApplication } from './store';
import { ErrorBoundary } from './error_boundary';
import { ConnectedI18nProvider } from '../components/i18n_provider';
import { buildSaga } from '../sagas';

import { API_URL } from 'react-native-dotenv';
import { API } from '../api';
API.configure(API_URL); // tslint:disable-line:no-expression-statement

const saga = buildSaga();
const store = buildStore(saga);
startApplication(saga, store); // tslint:disable-line:no-expression-statement

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedI18nProvider>
                <NativeRouter>
                    <MainConnectedComponent />
                </NativeRouter>
            </ConnectedI18nProvider>
        </Provider>
    </ErrorBoundary>
);

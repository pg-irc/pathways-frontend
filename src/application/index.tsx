import React from 'react';
import { Provider } from 'react-redux';
import * as main from '../components/main';
import { buildStore, startApplication } from './store';
import { ErrorBoundary } from './error_boundary';
import { ConnectedI18nProvider } from '../components/i18n_provider';
import { buildSaga } from '../sagas';
import { buildRouter } from './router';

const router = buildRouter();
const saga = buildSaga();
const store = buildStore(router, saga);
startApplication(saga, store); // tslint:disable-line:no-expression-statement

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedI18nProvider>
                <main.ConnectedComponent />
            </ConnectedI18nProvider>
        </Provider>
    </ErrorBoundary>
);

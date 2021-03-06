import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-native';
import { MainConnectedComponent } from '../components/main/main_connected_component';
import { buildStore, startApplication } from './store';
import { ErrorBoundary } from './helpers/error_boundary';
import { ConnectedI18nProvider } from '../components/i18n_provider';
import { buildSaga } from '../sagas';
import { API_URL } from 'react-native-dotenv';
import { setUrl } from '../api';
import {YellowBox} from 'react-native';
import { createMemoryHistory } from 'history';

// tslint:disable-next-line: no-expression-statement
YellowBox.ignoreWarnings([
    'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.',
    'Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.',
    'Warning: componentWillUpdate has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.',
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);

// tslint:disable-next-line:no-expression-statement
setUrl(API_URL);

const saga = buildSaga();
const store = buildStore(saga);
startApplication(saga, store); // tslint:disable-line:no-expression-statement

export const memoryHistory = createMemoryHistory();

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedI18nProvider>
                <Router history={memoryHistory}>
                    <MainConnectedComponent />
                </Router>
            </ConnectedI18nProvider>
        </Provider>
    </ErrorBoundary>
);

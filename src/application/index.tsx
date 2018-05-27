import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedMainComponent } from '../components/main/connected_main_component';
import { store } from './store';
import { ErrorBoundary } from './error_boundary';
import { ConnectedI18nProvider } from '../components/i18n_provider/connected_i18n_provider';

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedI18nProvider>
                <ConnectedMainComponent />
            </ConnectedI18nProvider>
        </Provider>
    </ErrorBoundary>
);

import React from 'react';
import { Provider } from 'react-redux';
import Container from '../hello_world';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ErrorBoundary } from './error_boundary';

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Container />
            </PersistGate>
        </Provider>
    </ErrorBoundary>
);

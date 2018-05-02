import React from 'react';
import { Provider } from 'react-redux';
import * as main from '../components/main';
import { store } from './store';
import { ErrorBoundary } from './error_boundary';
import { TaskList } from '../components/task_list/task_list';

const tasks = [
    {
        id: 1,
        complete: false,
        starred: false,
        taskDefinition: {
            id: 1,
            category: 'Education',
            description: 'Enroll child in elementary school.',
            labels: ['Important', 'Do Soon', 'Free'],
        },
    },
    {
        id: 2,
        complete: false,
        starred: true,
        taskDefinition: {
            id: 2,
            category: 'Education',
            description: 'Enroll child in middle or secondary school.',
            labels: ['Important', 'Free'],
        },
    },
];

export const Application = (): JSX.Element => (
    <ErrorBoundary>
        <Provider store={store}>
            <ConnectedNavigationBar>
                <ConnectedHelloWorld />
                <TaskList tasks={tasks} />
            </ConnectedNavigationBar>
        </Provider>
    </ErrorBoundary>
);

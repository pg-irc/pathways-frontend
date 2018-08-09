// tslint:disable:no-expression-statement no-let

import { TaskBuilder, buildNormalizedStore } from './helpers/tasks_helpers';
import * as stores from '../tasks';

describe('tasks reducer', () => {

    describe('task lists & settings', () => {
        let store: stores.Store;

        beforeEach(() => {
            const taskBuilder = new TaskBuilder();
            store = buildNormalizedStore(
                [taskBuilder],
                [taskBuilder.build().id],
            );
        });

        test('can add task to saved tasks list', () => {
            const task = new TaskBuilder().build();
            const finalStore = stores.reducer(store, stores.addToSavedList(task.id));
            expect(finalStore.savedTasksList).toHaveLength(2);
        });

        test('can remove task from saved tasks list', () => {
            const finalStore = stores.reducer(store, stores.removeFromSavedList(store.savedTasksList[0]));
            expect(finalStore.savedTasksList).toHaveLength(0);
        });

        test('can toggle a task completed', () => {
            const taskId = Object.keys(store.taskMap)[0];
            const oldCompleted = store.taskMap[taskId].completed;
            const finalStore = stores.reducer(store, stores.toggleCompleted(taskId));
            expect(finalStore.taskMap[taskId].completed).toEqual(!oldCompleted);
        });
    });
});

// tslint:disable:no-expression-statement no-let

import {
    TaskBuilder,
    TaskUserSettingsBuilder,
    buildNormalizedStore,
} from '../../stores/__tests__/helpers/tasks_helpers';
import * as stores from '../tasks';

describe('tasks reducer', () => {

    describe('task lists & settings', () => {
        let store: stores.Store;

        beforeEach(() => {
            const taskBuilder = new TaskBuilder();
            const taskUserSettingsBuilder = new TaskUserSettingsBuilder(taskBuilder.build().id);
            store = buildNormalizedStore(
                [taskBuilder],
                [taskUserSettingsBuilder],
                [taskBuilder.build().id],
                [taskBuilder.build().id],
            );
        });

        test('can add task to saved tasks list', () => {
            const task = new TaskBuilder().build();
            const finalStore = stores.reducer(store, stores.addToSavedList(task.id));
            expect(finalStore.savedTasksList).toHaveLength(2);
        });

        test('can add task to suggested tasks list', () => {
            const task = new TaskBuilder().build();
            const finalStore = stores.reducer(store, stores.addToSuggestedList(task.id));
            expect(finalStore.suggestedTasksList).toHaveLength(2);
        });

        test('can remove task from saved tasks list', () => {
            const finalStore = stores.reducer(store, stores.removeFromSavedList(store.savedTasksList[0]));
            expect(finalStore.savedTasksList).toHaveLength(0);
        });

        test('can remove task from suggested tasks list', () => {
            const finalStore = stores.reducer(store, stores.removeFromSuggestedList(store.suggestedTasksList[0]));
            expect(finalStore.suggestedTasksList).toHaveLength(0);
        });

        test('can toggle a task completed', () => {
            const taskUserSettingsId = Object.keys(store.taskUserSettingsMap)[0];
            const taskUserSettings = store.taskUserSettingsMap[taskUserSettingsId];
            const finalStore = stores.reducer(store, stores.toggleCompleted(taskUserSettings.taskId));
            expect(finalStore.taskUserSettingsMap[taskUserSettingsId].completed).toEqual(!taskUserSettings.completed);
        });

        test('can toggle a task starred', () => {
            const taskUserSettingsId = Object.keys(store.taskUserSettingsMap)[0];
            const taskUserSettings = store.taskUserSettingsMap[taskUserSettingsId];
            const finalStore = stores.reducer(store, stores.toggleStarred(taskUserSettings.taskId));
            expect(finalStore.taskUserSettingsMap[taskUserSettingsId].starred).toEqual(!taskUserSettings.starred);
        });
    });
});
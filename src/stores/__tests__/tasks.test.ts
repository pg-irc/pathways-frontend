// tslint:disable:no-expression-statement no-let

import { TaskBuilder, buildNormalizedStore } from './helpers/tasks_helpers';
import * as stores from '../tasks';
import { UserData } from '../questionnaire/actions';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { PersistedUserDataBuilder } from '../../selectors/__tests__/helpers/user_data_helpers';

const asValid = (aStore: stores.Store): stores.ValidStore => {
    if (aStore instanceof stores.ValidStore) {
        return aStore;
    }
    throw new Error('Store expected to be valid');
};

describe('tasks reducer', () => {

    describe('with a valid store', () => {

        let store: stores.ValidStore; // TODO rename to validStore

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

            expect(asValid(finalStore).savedTasksList).toHaveLength(2);
        });

        test('can remove task from saved tasks list', () => {
            const finalStore = stores.reducer(store, stores.removeFromSavedList(store.savedTasksList[0]));
            expect(asValid(finalStore).savedTasksList).toHaveLength(0);
        });

        test('can toggle a task completed', () => {
            const taskId = Object.keys(store.taskMap)[0];
            const oldCompleted = store.taskMap[taskId].completed;
            const finalStore = stores.reducer(store, stores.toggleCompleted(taskId));
            expect(asValid(finalStore).taskMap[taskId].completed).toEqual(!oldCompleted);
        });

        describe('when handling a load request', () => {

            it('returns a loading store from a load request action', () => {
                const finalStore = stores.reducer(store, UserData.loadRequest());
                expect(finalStore).toBeInstanceOf(stores.LoadingStore);
            });

            it('should return a store with the last known valid state', () => {
                const finalStore = stores.reducer(store, UserData.loadRequest());
                if (finalStore instanceof stores.LoadingStore) {
                    expect(finalStore.lastValidState).toBe(store);
                } else {
                    fail();
                }
            });
        });

        describe('with a loading store', () => {

            let loadingStore: stores.LoadingStore;

            beforeEach(() => {
                loadingStore = new stores.LoadingStore(store);
            });

            describe('when handling a load error', () => {

                it('should return an invalid store', () => {
                    const finalStore = stores.reducer(loadingStore, UserData.loadFailure(''));
                    expect(finalStore).toBeInstanceOf(stores.InvalidStore);
                });

                it('should return s store with the error message', () => {
                    const error = aString();
                    const finalStore = stores.reducer(loadingStore, UserData.loadFailure(error));
                    if (finalStore instanceof stores.InvalidStore) {
                        expect(finalStore.error).toBe(error);
                    } else {
                        fail();
                    }
                });
            });

            describe('when handling a load success', () => {

                let firstTaskId = aString();
                let secondTaskId = aString();
                let resultStore: stores.Store = undefined;

                beforeEach(() => {
                    const firstTaskBuilder = new TaskBuilder().withId(firstTaskId);
                    const secondTaskBuilder = new TaskBuilder().withId(secondTaskId);

                    const storeWhereFirstTaskIsSaved = buildNormalizedStore(
                        [firstTaskBuilder, secondTaskBuilder],
                        [firstTaskId],
                    );
                    const theLoadingStore = new stores.LoadingStore(storeWhereFirstTaskIsSaved);

                    const dataWhereSecondTaskIsSaved = new PersistedUserDataBuilder().
                        addSavedTask(secondTaskId).
                        buildObject();

                    resultStore = stores.reducer(theLoadingStore, UserData.loadSuccess(dataWhereSecondTaskIsSaved));
                });

                it('should return a valid store', () => {
                    expect(resultStore).toBeInstanceOf(stores.ValidStore);
                });

                it('should return a store with task saved in loaded data marked as saved', () => {
                    if (resultStore instanceof stores.ValidStore) {
                        expect(resultStore.savedTasksList).toContain(secondTaskId);
                    }
                });

                it('should return a store with task not saved in loaded data not marked as saved', () => {
                    if (resultStore instanceof stores.ValidStore) {
                        expect(resultStore.savedTasksList).not.toContain(firstTaskId);
                    }
                });
            });
        });
    });
});

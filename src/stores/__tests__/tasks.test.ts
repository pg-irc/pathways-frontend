// tslint:disable:no-expression-statement no-let

import { TaskBuilder, buildNormalizedStore } from './helpers/tasks_helpers';
import * as stores from '../tasks';
import { UserData } from '../user_data';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { PersistedUserDataBuilder } from './helpers/user_data_helpers';
import { addToSavedList, removeFromSavedList, toggleCompleted } from '../tasks/actions';

const asValid = (aStore: stores.Store): stores.ValidStore => {
    if (aStore instanceof stores.ValidStore) {
        return aStore;
    }
    throw new Error('Store expected to be valid');
};

describe('tasks reducer', () => {

    describe('with a valid store', () => {

        let validStore: stores.ValidStore;

        beforeEach(() => {
            const taskBuilder = new TaskBuilder();
            validStore = buildNormalizedStore(
                [taskBuilder],
                [taskBuilder.build().id],
            );
        });

        test('can add task to saved tasks list', () => {
            const task = new TaskBuilder().build();
            const finalStore = stores.reducer(validStore, addToSavedList(task.id));

            expect(asValid(finalStore).savedTasksList).toHaveLength(2);
        });

        test('can remove task from saved tasks list', () => {
            const finalStore = stores.reducer(validStore, removeFromSavedList(validStore.savedTasksList[0]));
            expect(asValid(finalStore).savedTasksList).toHaveLength(0);
        });

        test('can toggle a task completed', () => {
            const taskId = Object.keys(validStore.taskMap)[0];
            const oldCompleted = validStore.taskMap[taskId].completed;
            const finalStore = stores.reducer(validStore, toggleCompleted(taskId));
            expect(asValid(finalStore).taskMap[taskId].completed).toEqual(!oldCompleted);
        });

        describe('when handling a load request', () => {

            it('returns a loading store from a load request action', () => {
                const finalStore = stores.reducer(validStore, UserData.loadRequest());
                expect(finalStore).toBeInstanceOf(stores.LoadingStore);
            });

            it('should return a store with the last known valid state', () => {
                const finalStore = stores.reducer(validStore, UserData.loadRequest());
                if (finalStore instanceof stores.LoadingStore) {
                    expect(finalStore.lastValidState).toBe(validStore);
                } else {
                    fail();
                }
            });
        });

        describe('with a loading store', () => {

            let loadingStore: stores.LoadingStore;

            beforeEach(() => {
                loadingStore = new stores.LoadingStore(validStore);
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

// tslint:disable:no-expression-statement no-let

import { TaskBuilder, buildNormalizedStore } from './helpers/tasks_helpers';
import { UserDataPersistence } from '../user_data';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { PersistedUserDataBuilder } from './helpers/user_data_helpers';
import { addToSavedList, removeFromSavedList, toggleCompleted } from '../topics/actions';
import * as stores from '../topics';
import { clearAllUserData } from '../questionnaire/actions';

describe('tasks reducer', () => {

    describe('with a valid store', () => {

        let validStore: stores.ValidTaskStore;

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

            expect(stores.toValidOrThrow(finalStore).savedTasksList).toHaveLength(2);
        });

        test('can remove task from saved tasks list', () => {
            const finalStore = stores.reducer(validStore, removeFromSavedList(validStore.savedTasksList[0]));
            expect(stores.toValidOrThrow(finalStore).savedTasksList).toHaveLength(0);
        });

        test('can toggle a task completed', () => {
            const taskId = Object.keys(validStore.taskMap)[0];
            const oldCompleted = validStore.taskMap[taskId].completed;
            const finalStore = stores.reducer(validStore, toggleCompleted(taskId));
            expect(stores.toValidOrThrow(finalStore).taskMap[taskId].completed).toEqual(!oldCompleted);
        });

        describe('clear all user data action', () => {
            test('sets task to not completed', () => {
                const aTask = new TaskBuilder().withCompleted(true);
                const theStore = buildNormalizedStore([aTask], []);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).taskMap[aTask.id].completed).toBe(false);
            });

            test('removes task from my plan', () => {
                const aTask = new TaskBuilder();
                const theStore = buildNormalizedStore([aTask], [aTask.id]);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).savedTasksList).toEqual([]);
            });

        });

        describe('when handling a load request', () => {

            it('returns a loading store from a load request action', () => {
                const finalStore = stores.reducer(validStore, UserDataPersistence.loadRequest());
                expect(finalStore).toBeInstanceOf(stores.LoadingTaskStore);
            });

            it('should return a store with the last known valid state', () => {
                const finalStore = stores.reducer(validStore, UserDataPersistence.loadRequest());
                if (finalStore instanceof stores.LoadingTaskStore) {
                    expect(finalStore.lastValidState).toBe(validStore);
                } else {
                    fail();
                }
            });
        });

        describe('with a loading store', () => {

            let loadingStore: stores.LoadingTaskStore;

            beforeEach(() => {
                loadingStore = new stores.LoadingTaskStore(validStore);
            });

            describe('when handling a load error', () => {

                it('should return an invalid store', () => {
                    const finalStore = stores.reducer(loadingStore, UserDataPersistence.loadFailure(''));
                    expect(finalStore).toBeInstanceOf(stores.InvalidTaskStore);
                });

                it('should return s store with the error message', () => {
                    const error = aString();
                    const finalStore = stores.reducer(loadingStore, UserDataPersistence.loadFailure(error));
                    if (finalStore instanceof stores.InvalidTaskStore) {
                        expect(finalStore.error).toBe(error);
                    } else {
                        fail();
                    }
                });
            });

            describe('when loading saved tasks', () => {

                let firstTaskId = aString();
                let secondTaskId = aString();
                let resultStore: stores.TaskStore = undefined;

                beforeEach(() => {
                    const firstTaskBuilder = new TaskBuilder().withId(firstTaskId);
                    const secondTaskBuilder = new TaskBuilder().withId(secondTaskId);

                    const validStoreWhereFirstTaskIsSaved = buildNormalizedStore(
                        [firstTaskBuilder, secondTaskBuilder],
                        [firstTaskId],
                    );
                    const theStore = new stores.LoadingTaskStore(validStoreWhereFirstTaskIsSaved);

                    const persistedDataWhereSecondTaskIsSaved = new PersistedUserDataBuilder().
                        addSavedTask(secondTaskId).
                        buildObject();
                    const loadAction = UserDataPersistence.loadSuccess(persistedDataWhereSecondTaskIsSaved);

                    resultStore = stores.reducer(theStore, loadAction);
                });

                it('should return a valid store', () => {
                    expect(resultStore).toBeInstanceOf(stores.ValidTaskStore);
                });

                it('should return a store with task saved in loaded data marked as saved', () => {
                    expect(stores.toValidOrThrow(resultStore).savedTasksList).toContain(secondTaskId);
                });

                it('should return a store with task not saved in loaded data not marked as saved', () => {
                    expect(stores.toValidOrThrow(resultStore).savedTasksList).not.toContain(firstTaskId);
                });

            });

            it('should ignore invalid task ids in the loaded data', () => {
                const taskBuilder = new TaskBuilder();
                const theValidStore = buildNormalizedStore([taskBuilder], []);
                const theLoadingStore = new stores.LoadingTaskStore(theValidStore);
                const dataWithInvalidId = new PersistedUserDataBuilder().
                    addSavedTask(aString()).
                    buildObject();
                const theAction = UserDataPersistence.loadSuccess(dataWithInvalidId);
                const resultStore = stores.reducer(theLoadingStore, theAction);
                expect(stores.toValidOrThrow(resultStore).savedTasksList).toHaveLength(0);
            });

            describe('when loading completed tasks', () => {
                it('should set completed tasks to completed', () => {
                    const taskId = aString();
                    const theTask = new TaskBuilder().withId(taskId).withCompleted(false);
                    const storeState = buildNormalizedStore([theTask], []);
                    const theStore = new stores.LoadingTaskStore(storeState);
                    const actionStateWithCompletedTask = new PersistedUserDataBuilder().
                        addCompletedTask(taskId).
                        buildObject();
                    const theAction = UserDataPersistence.loadSuccess(actionStateWithCompletedTask);

                    const resultStore = stores.reducer(theStore, theAction);
                    const tasks = stores.toValidOrThrow(resultStore).taskMap;

                    expect(tasks[taskId].completed).toBe(true);
                });

                it('should not set uncompleted tasks to completed', () => {
                    const taskId = aString();
                    const theTask = new TaskBuilder().withId(taskId).withCompleted(true);
                    const storeState = buildNormalizedStore([theTask], []);
                    const theStore = new stores.LoadingTaskStore(storeState);
                    const actionStateWithNoCompletedTasks = new PersistedUserDataBuilder().buildObject();
                    const theAction = UserDataPersistence.loadSuccess(actionStateWithNoCompletedTasks);

                    const resultStore = stores.reducer(theStore, theAction);
                    const tasks = stores.toValidOrThrow(resultStore).taskMap;

                    expect(tasks[taskId].completed).toBe(false);
                });
            });
        });
    });
});

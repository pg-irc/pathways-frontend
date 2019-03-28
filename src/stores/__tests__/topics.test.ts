// tslint:disable:no-expression-statement no-let

import { TopicBuilder, buildNormalizedStore } from './helpers/topics_helpers';
import { UserDataPersistence } from '../user_data';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { PersistedUserDataBuilder } from './helpers/user_data_helpers';
import { addToSavedList, removeFromSavedList, toggleCompleted } from '../topics/actions';
import * as stores from '../topics';
import { clearAllUserData } from '../questionnaire/actions';

describe('topics reducer', () => {

    describe('with a valid store', () => {

        let validStore: stores.ValidTaskStore;

        beforeEach(() => {
            const topicBuilder = new TopicBuilder();
            validStore = buildNormalizedStore(
                [topicBuilder],
                [topicBuilder.build().id],
            );
        });

        test('can add topic to saved topics list', () => {
            const topic = new TopicBuilder().build();
            const finalStore = stores.reducer(validStore, addToSavedList(topic.id));

            expect(stores.toValidOrThrow(finalStore).savedTopicsList).toHaveLength(2);
        });

        test('can remove topic from saved topics list', () => {
            const finalStore = stores.reducer(validStore, removeFromSavedList(validStore.savedTopicsList[0]));
            expect(stores.toValidOrThrow(finalStore).savedTopicsList).toHaveLength(0);
        });

        test('can toggle a topic completed', () => {
            const topicId = Object.keys(validStore.topicMap)[0];
            const oldCompleted = validStore.topicMap[topicId].completed;
            const finalStore = stores.reducer(validStore, toggleCompleted(topicId));
            expect(stores.toValidOrThrow(finalStore).topicMap[topicId].completed).toEqual(!oldCompleted);
        });

        describe('clear all user data action', () => {
            test('sets topic to not completed', () => {
                const aTask = new TopicBuilder().withCompleted(true);
                const theStore = buildNormalizedStore([aTask], []);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).topicMap[aTask.id].completed).toBe(false);
            });

            test('removes topic from my plan', () => {
                const aTask = new TopicBuilder();
                const theStore = buildNormalizedStore([aTask], [aTask.id]);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).savedTopicsList).toEqual([]);
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

            describe('when loading saved topics', () => {

                let firstTaskId = aString();
                let secondTaskId = aString();
                let resultStore: stores.TaskStore = undefined;

                beforeEach(() => {
                    const firstTaskBuilder = new TopicBuilder().withId(firstTaskId);
                    const secondTaskBuilder = new TopicBuilder().withId(secondTaskId);

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

                it('should return a store with topic saved in loaded data marked as saved', () => {
                    expect(stores.toValidOrThrow(resultStore).savedTopicsList).toContain(secondTaskId);
                });

                it('should return a store with topic not saved in loaded data not marked as saved', () => {
                    expect(stores.toValidOrThrow(resultStore).savedTopicsList).not.toContain(firstTaskId);
                });

            });

            it('should ignore invalid topic ids in the loaded data', () => {
                const topicBuilder = new TopicBuilder();
                const theValidStore = buildNormalizedStore([topicBuilder], []);
                const theLoadingStore = new stores.LoadingTaskStore(theValidStore);
                const dataWithInvalidId = new PersistedUserDataBuilder().
                    addSavedTask(aString()).
                    buildObject();
                const theAction = UserDataPersistence.loadSuccess(dataWithInvalidId);
                const resultStore = stores.reducer(theLoadingStore, theAction);
                expect(stores.toValidOrThrow(resultStore).savedTopicsList).toHaveLength(0);
            });

            describe('when loading completed topics', () => {
                it('should set completed topics to completed', () => {
                    const topicId = aString();
                    const theTask = new TopicBuilder().withId(topicId).withCompleted(false);
                    const storeState = buildNormalizedStore([theTask], []);
                    const theStore = new stores.LoadingTaskStore(storeState);
                    const actionStateWithCompletedTask = new PersistedUserDataBuilder().
                        addCompletedTask(topicId).
                        buildObject();
                    const theAction = UserDataPersistence.loadSuccess(actionStateWithCompletedTask);

                    const resultStore = stores.reducer(theStore, theAction);
                    const topics = stores.toValidOrThrow(resultStore).topicMap;

                    expect(topics[topicId].completed).toBe(true);
                });

                it('should not set uncompleted topics to completed', () => {
                    const topicId = aString();
                    const theTask = new TopicBuilder().withId(topicId).withCompleted(true);
                    const storeState = buildNormalizedStore([theTask], []);
                    const theStore = new stores.LoadingTaskStore(storeState);
                    const actionStateWithNoCompletedTasks = new PersistedUserDataBuilder().buildObject();
                    const theAction = UserDataPersistence.loadSuccess(actionStateWithNoCompletedTasks);

                    const resultStore = stores.reducer(theStore, theAction);
                    const topics = stores.toValidOrThrow(resultStore).topicMap;

                    expect(topics[topicId].completed).toBe(false);
                });
            });
        });
    });
});

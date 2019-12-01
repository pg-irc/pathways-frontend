// tslint:disable:no-expression-statement no-let

import { TopicBuilder, buildNormalizedStore } from './helpers/topics_helpers';
import { UserDataPersistence } from '../user_data';
import { aString } from '../../helpers/random_test_values';
import { PersistedUserDataBuilder } from './helpers/user_data_helpers';
import { addToSavedList, removeFromSavedList, toggleCompleted } from '../topics/actions';
import * as stores from '../topics';
import { clearAllUserData, closeQuestionnaire } from '../questionnaire/actions';
import { Id } from '../topics';

describe('topics reducer', () => {

    describe('with a valid store', () => {

        let validStore: stores.ValidTopicStore;
        const topicId = aString();

        beforeEach(() => {
            const topicBuilder = new TopicBuilder().withId(topicId);
            validStore = buildNormalizedStore(
                [topicBuilder],
                [topicId],
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
            const oldCompleted = validStore.topicMap[topicId].completed;
            const finalStore = stores.reducer(validStore, toggleCompleted(topicId));
            expect(stores.toValidOrThrow(finalStore).topicMap[topicId].completed).toEqual(!oldCompleted);
        });

        describe('when closing the questionnaire', () => {
            it('marks newly recommended topic as newlyRecommended', () => {
                const newlyRecommendedTopics: ReadonlyArray<Id> = [topicId];
                const action = closeQuestionnaire(newlyRecommendedTopics);
                const finalStore = stores.reducer(validStore, action);
                expect(stores.toValidOrThrow(finalStore).topicMap[topicId].newlyRecommended).toBe(true);
            });

            it('does not mark other tasks as newlyRecommended', () => {
                const newlyRecommendedTopics: ReadonlyArray<Id> = [];
                const action = closeQuestionnaire(newlyRecommendedTopics);
                const finalStore = stores.reducer(validStore, action);
                expect(stores.toValidOrThrow(finalStore).topicMap[topicId].newlyRecommended).toBe(false);
            });
        });

        describe('clear all user data action', () => {
            test('sets topic to not completed', () => {
                const aTopic = new TopicBuilder().withCompleted(true);
                const theStore = buildNormalizedStore([aTopic], []);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).topicMap[aTopic.id].completed).toBe(false);
            });

            test('removes topic from my plan', () => {
                const aTopic = new TopicBuilder();
                const theStore = buildNormalizedStore([aTopic], [aTopic.id]);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).savedTopicsList).toEqual([]);
            });

        });

        describe('when handling a load request', () => {

            it('returns a loading store from a load request action', () => {
                const finalStore = stores.reducer(validStore, UserDataPersistence.loadRequest());
                expect(finalStore).toBeInstanceOf(stores.LoadingTopicStore);
            });

            it('should return a store with the last known valid state', () => {
                const finalStore = stores.reducer(validStore, UserDataPersistence.loadRequest());
                if (finalStore instanceof stores.LoadingTopicStore) {
                    expect(finalStore.lastValidState).toBe(validStore);
                } else {
                    fail();
                }
            });
        });

        describe('with a loading store', () => {

            let loadingStore: stores.LoadingTopicStore;

            beforeEach(() => {
                loadingStore = new stores.LoadingTopicStore(validStore);
            });

            describe('when handling a load error', () => {

                it('should return an invalid store', () => {
                    const finalStore = stores.reducer(loadingStore, UserDataPersistence.loadFailure(''));
                    expect(finalStore).toBeInstanceOf(stores.InValidTopicStore);
                });

                it('should return s store with the error message', () => {
                    const error = aString();
                    const finalStore = stores.reducer(loadingStore, UserDataPersistence.loadFailure(error));
                    if (finalStore instanceof stores.InValidTopicStore) {
                        expect(finalStore.error).toBe(error);
                    } else {
                        fail();
                    }
                });
            });

            describe('when loading saved topics', () => {

                let firstTopicId = aString();
                let secondTopicId = aString();
                let resultStore: stores.TopicStore = undefined;

                beforeEach(() => {
                    const firstTopicBuilder = new TopicBuilder().withId(firstTopicId);
                    const secondTopicBuilder = new TopicBuilder().withId(secondTopicId);

                    const validStoreWhereFirstTopicIsSaved = buildNormalizedStore(
                        [firstTopicBuilder, secondTopicBuilder],
                        [firstTopicId],
                    );
                    const theStore = new stores.LoadingTopicStore(validStoreWhereFirstTopicIsSaved);

                    const persistedDataWhereSecondTopicIsSaved = new PersistedUserDataBuilder().
                        addSavedTopic(secondTopicId).
                        buildObject();
                    const loadAction = UserDataPersistence.loadSuccess(persistedDataWhereSecondTopicIsSaved);

                    resultStore = stores.reducer(theStore, loadAction);
                });

                it('should return a valid store', () => {
                    expect(resultStore).toBeInstanceOf(stores.ValidTopicStore);
                });

                it('should return a store with topic saved in loaded data marked as saved', () => {
                    expect(stores.toValidOrThrow(resultStore).savedTopicsList).toContain(secondTopicId);
                });

                it('should return a store with topic not saved in loaded data not marked as saved', () => {
                    expect(stores.toValidOrThrow(resultStore).savedTopicsList).not.toContain(firstTopicId);
                });

            });

            it('should ignore invalid topic ids in the loaded data', () => {
                const topicBuilder = new TopicBuilder();
                const theValidStore = buildNormalizedStore([topicBuilder], []);
                const theLoadingStore = new stores.LoadingTopicStore(theValidStore);
                const dataWithInvalidId = new PersistedUserDataBuilder().
                    addSavedTopic(aString()).
                    buildObject();
                const theAction = UserDataPersistence.loadSuccess(dataWithInvalidId);
                const resultStore = stores.reducer(theLoadingStore, theAction);
                expect(stores.toValidOrThrow(resultStore).savedTopicsList).toHaveLength(0);
            });

            describe('when loading completed topics', () => {
                it('should set completed topics to completed', () => {
                    const theTopicId = aString();
                    const theTopic = new TopicBuilder().withId(theTopicId).withCompleted(false);
                    const storeState = buildNormalizedStore([theTopic], []);
                    const theStore = new stores.LoadingTopicStore(storeState);
                    const actionStateWithCompletedTopic = new PersistedUserDataBuilder().
                        addCompletedTopic(theTopicId).
                        buildObject();
                    const theAction = UserDataPersistence.loadSuccess(actionStateWithCompletedTopic);

                    const resultStore = stores.reducer(theStore, theAction);
                    const topics = stores.toValidOrThrow(resultStore).topicMap;

                    expect(topics[theTopicId].completed).toBe(true);
                });

                it('should not set uncompleted topics to completed', () => {
                    const theTopicId = aString();
                    const theTopic = new TopicBuilder().withId(theTopicId).withCompleted(true);
                    const storeState = buildNormalizedStore([theTopic], []);
                    const theStore = new stores.LoadingTopicStore(storeState);
                    const actionStateWithNoCompletedTopics = new PersistedUserDataBuilder().buildObject();
                    const theAction = UserDataPersistence.loadSuccess(actionStateWithNoCompletedTopics);

                    const resultStore = stores.reducer(theStore, theAction);
                    const topics = stores.toValidOrThrow(resultStore).topicMap;

                    expect(topics[theTopicId].completed).toBe(false);
                });
            });
        });
    });
});

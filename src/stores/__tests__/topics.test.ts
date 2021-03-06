// tslint:disable:no-expression-statement no-let

import { TopicBuilder, buildNormalizedStore } from './helpers/topics_helpers';
import { DataPersistence } from '../persisted_data';
import { aString } from '../../application/helpers/random_test_values';
import { PersistedDataBuilder } from './helpers/persisted_data_builder';
import { bookmarkTopic, unbookmarkTopic } from '../topics/actions';
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

        test('can add topic to bookmarked topics list', () => {
            const topic = new TopicBuilder().build();
            const finalStore = stores.reducer(validStore, bookmarkTopic(topic.id));

            expect(stores.toValidOrThrow(finalStore).bookmarkedTopics).toHaveLength(2);
        });

        test('can remove topic from bookmarked topics list', () => {
            const finalStore = stores.reducer(validStore, unbookmarkTopic(validStore.bookmarkedTopics[0]));
            expect(stores.toValidOrThrow(finalStore).bookmarkedTopics).toHaveLength(0);
        });

        describe('when closing the questionnaire', () => {
            it('marks newly recommended topic as isNewlyRecommended', () => {
                const newlyRecommendedTopics: ReadonlyArray<Id> = [topicId];
                const action = closeQuestionnaire(newlyRecommendedTopics);
                const finalStore = stores.reducer(validStore, action);
                expect(stores.toValidOrThrow(finalStore).topicMap[topicId].isNewlyRecommended).toBe(true);
            });

            it('does not mark other tasks as isNewlyRecommended', () => {
                const newlyRecommendedTopics: ReadonlyArray<Id> = [];
                const action = closeQuestionnaire(newlyRecommendedTopics);
                const finalStore = stores.reducer(validStore, action);
                expect(stores.toValidOrThrow(finalStore).topicMap[topicId].isNewlyRecommended).toBe(false);
            });
        });

        describe('clear all user data action', () => {
            test('sets topic to not newly recommended', () => {
                const aTopic = new TopicBuilder().withNewlyRecommended(true);
                const theStore = buildNormalizedStore([aTopic], []);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).topicMap[aTopic.id].isNewlyRecommended).toBe(false);
            });

            test('removes topic from my plan', () => {
                const aTopic = new TopicBuilder();
                const theStore = buildNormalizedStore([aTopic], [aTopic.id]);

                const finalStore = stores.reducer(theStore, clearAllUserData());

                expect(stores.toValidOrThrow(finalStore).bookmarkedTopics).toEqual([]);
            });

        });

        describe('when handling a load request', () => {

            it('returns a loading store from a load request action', () => {
                const finalStore = stores.reducer(validStore, DataPersistence.loadRequest());
                expect(finalStore).toBeInstanceOf(stores.LoadingTopicStore);
            });

            it('should return a store with the last known valid state', () => {
                const finalStore = stores.reducer(validStore, DataPersistence.loadRequest());
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
                    const finalStore = stores.reducer(loadingStore, DataPersistence.loadFailure(''));
                    expect(finalStore).toBeInstanceOf(stores.InValidTopicStore);
                });

                it('should return s store with the error message', () => {
                    const error = aString();
                    const finalStore = stores.reducer(loadingStore, DataPersistence.loadFailure(error));
                    if (finalStore instanceof stores.InValidTopicStore) {
                        expect(finalStore.error).toBe(error);
                    } else {
                        fail();
                    }
                });
            });

            describe('when loading bookmarked topics', () => {

                let firstTopicId = aString();
                let secondTopicId = aString();
                let resultStore: stores.TopicStore = undefined;

                beforeEach(() => {
                    const firstTopicBuilder = new TopicBuilder().withId(firstTopicId);
                    const secondTopicBuilder = new TopicBuilder().withId(secondTopicId);

                    const validStoreWhereFirstTopicIsbookmarked = buildNormalizedStore(
                        [firstTopicBuilder, secondTopicBuilder],
                        [firstTopicId],
                    );
                    const theStore = new stores.LoadingTopicStore(validStoreWhereFirstTopicIsbookmarked);

                    const persistedDataWhereSecondTopicIsbookmarked = new PersistedDataBuilder().
                        withBookmarkedTopic(secondTopicId).
                        build();
                    const loadAction = DataPersistence.loadSuccess(persistedDataWhereSecondTopicIsbookmarked);

                    resultStore = stores.reducer(theStore, loadAction);
                });

                it('should return a valid store', () => {
                    expect(resultStore).toBeInstanceOf(stores.ValidTopicStore);
                });

                it('should return a store with topic bookmarked in loaded data marked as bookmarked', () => {
                    expect(stores.toValidOrThrow(resultStore).bookmarkedTopics).toContain(secondTopicId);
                });

                it('should return a store with topic not bookmarked in loaded data not marked as bookmarked', () => {
                    expect(stores.toValidOrThrow(resultStore).bookmarkedTopics).not.toContain(firstTopicId);
                });

            });

            it('should ignore invalid topic ids in the loaded data', () => {
                const topicBuilder = new TopicBuilder();
                const theValidStore = buildNormalizedStore([topicBuilder], []);
                const theLoadingStore = new stores.LoadingTopicStore(theValidStore);
                const dataWithInvalidId = new PersistedDataBuilder().
                    withBookmarkedTopic(aString()).
                    build();
                const theAction = DataPersistence.loadSuccess(dataWithInvalidId);
                const resultStore = stores.reducer(theLoadingStore, theAction);
                expect(stores.toValidOrThrow(resultStore).bookmarkedTopics).toHaveLength(0);
            });
        });
    });
});

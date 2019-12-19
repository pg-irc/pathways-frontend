// tslint:disable:no-expression-statement no-let

import { TopicBuilder, buildNormalizedStore } from './helpers/topics_helpers';
import * as stores from '../topics';
import { aString } from '../../helpers/random_test_values';

describe('topics test helpers', () => {

    describe('building the topic', () => {

        test('id property', () => {
            const id = aString();
            const topic = new TopicBuilder().withId(id).build();
            expect(topic.id).toBe(id);
        });

        test('title property', () => {
            const localeCode = aString();
            const title = aString();
            const topic = new TopicBuilder().withLocaleCode(localeCode).withTitle(title).build();
            expect(topic.title[localeCode]).toBe(title);
        });

        test('description property', () => {
            const localeCode = aString();
            const description = aString();
            const topic = new TopicBuilder().withLocaleCode(localeCode).withDescription(description).build();
            expect(topic.description[localeCode]).toBe(description);
        });
    });

    describe('the store', () => {

        describe('building a normalized store', () => {
            let firstTaskBuilder: TopicBuilder;
            let secondTaskBuilder: TopicBuilder;
            let validStore: stores.ValidTopicStore;

            beforeEach(() => {
                firstTaskBuilder = new TopicBuilder();
                secondTaskBuilder = new TopicBuilder();
                validStore = buildNormalizedStore(
                    [firstTaskBuilder, secondTaskBuilder],
                    [firstTaskBuilder.build().id],
                );
            });

            test('topic map property', () => {
                expect(validStore).toHaveProperty('topicMap');
            });

            test('bookmarked topics list property', () => {
                expect(validStore).toHaveProperty('bookmarkedTopics');
            });

            test('topics map keys are expected topic ids', () => {
                expect(Object.keys(validStore.topicMap)).toEqual([firstTaskBuilder.build().id, secondTaskBuilder.build().id]);
            });

        });
    });
});

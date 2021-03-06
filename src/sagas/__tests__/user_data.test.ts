// tslint:disable:no-expression-statement no-trailing-whitespace

import { PersistedDataBuilder } from '../../stores/__tests__/helpers/persisted_data_builder';
import { aString } from '../../application/helpers/random_test_values';
import { serializeUserData, deserializeUserData } from '../user_data';
import { HumanServiceDataBuilder, buildServiceMap } from '../../stores/__tests__/helpers/services_helpers';

describe('persisted user_data tests', () => {

    test('chosen answer should persist between being serialized and deserialized', () => {
        const chosenAnswer = aString();
        const userData = new PersistedDataBuilder().withChosenAnswer(chosenAnswer).build();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.chosenAnswers[0]).toEqual(chosenAnswer);
    });

    test('bookmarked topics should persist between being serialized and deserialized', () => {
        const bookmarkedTopic = aString();
        const userData = new PersistedDataBuilder().withBookmarkedTopic(bookmarkedTopic).build();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.bookmarkedTopics[0]).toEqual(bookmarkedTopic);
    });

    test('bookmarked services should persist between being serialized and deserialized', () => {
        const bookmarkedServiceId = aString();
        const bookmarkedService = new HumanServiceDataBuilder().withId(bookmarkedServiceId).withBookmarked(true);
        const bookmarkedServiceMap = buildServiceMap([bookmarkedService]);
        const userData = new PersistedDataBuilder().withBookmarkedServices(bookmarkedServiceMap).build();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.bookmarkedServices[bookmarkedServiceId]).toEqual(bookmarkedServiceMap[bookmarkedServiceId]);
    });
});

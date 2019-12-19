// tslint:disable:no-expression-statement no-trailing-whitespace

import { PersistedUserDataBuilder } from '../../stores/__tests__/helpers/user_data_helpers';
import { aString } from '../../helpers/random_test_values';
import { serializeUserData, deserializeUserData } from '../user_data';
import { ServiceBuilder, buildServiceMap } from '../../stores/__tests__/helpers/services_helpers';

describe('persisted user_data tests', () => {

    test('chosen answer should persist between being serialized and deserialized', () => {
        const chosenAnswer = aString();
        const userData = new PersistedUserDataBuilder().addChosenAnswer(chosenAnswer).buildObject();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.chosenAnswers[0]).toEqual(chosenAnswer);
    });
        
    test('bookmarked topics should persist between being serialized and deserialized', () => {
        const bookmarkedTopic = aString();
        const userData = new PersistedUserDataBuilder().addBookmarkedTopic(bookmarkedTopic).buildObject();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.bookmarkedTopics[0]).toEqual(bookmarkedTopic);
    });

    test('bookmarked services should persist between being serialized and deserialized', () => {
        const bookmarkedServiceId = aString();
        const bookmarkedService = new ServiceBuilder().withId(bookmarkedServiceId).withBookmarked(true);
        const bookmarkedServiceMap = buildServiceMap([bookmarkedService]);
        const userData = new PersistedUserDataBuilder().addBookmarkedServices(bookmarkedServiceMap).buildObject();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.bookmarkedServices[bookmarkedServiceId]).toEqual(bookmarkedServiceMap[bookmarkedServiceId]);
    });
});

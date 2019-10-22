// tslint:disable:no-expression-statement no-trailing-whitespace

import { PersistedUserDataBuilder } from '../../stores/__tests__/helpers/user_data_helpers';
import { aString } from '../../helpers/random_test_values';
import { serializeUserData, deserializeUserData } from '../user_data';

describe('persisted user_data tests', () => {
        
    test('chosen answer should persist between being serialized and deserialized', () => {
        const chosenAnswer = aString();
        const userData = new PersistedUserDataBuilder().addChosenAnswer(chosenAnswer).buildObject();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.chosenAnswers[0]).toEqual(chosenAnswer);
    });
        
    test('saved topics should persist between being serialized and deserialized', () => {
        const savedTopic = aString();
        const userData = new PersistedUserDataBuilder().addSavedTopic(savedTopic).buildObject();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.savedTopics[0]).toEqual(savedTopic);
    });

    test('completed topics should persist between being serialized and deserialized', () => {
        const completedTopic = aString();
        const userData = new PersistedUserDataBuilder().addCompletedTopic(completedTopic).buildObject();
        const recreatedData = deserializeUserData(serializeUserData(userData));
        expect(recreatedData.completedTopics[0]).toEqual(completedTopic);
    });
});

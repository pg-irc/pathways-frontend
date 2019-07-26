// tslint:disable:no-expression-statement no-trailing-whitespace

import { PersistedUserDataBuilder } from '../../stores/__tests__/helpers/user_data_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { serializePersistedData, deserializePersistedData } from '../user_data';

describe('persisted user_data tests', () => {
        
    test('chosen answer should persist between being serialized and deserialized', () => {
        const chosenAnswer = aString();
        const persistedData = new PersistedUserDataBuilder().addChosenAnswer(chosenAnswer).buildObject();
        const recreatedData = deserializePersistedData(serializePersistedData(persistedData));
        expect(chosenAnswer).toEqual(recreatedData.chosenAnswers[0]);
    });
        
    test('saved topics should persist between being serialized and deserialized', () => {
        const savedTopic = aString();
        const persistedData = new PersistedUserDataBuilder().addSavedTopic(savedTopic).buildObject();
        const recreatedData = deserializePersistedData(serializePersistedData(persistedData));
        expect(savedTopic).toEqual(recreatedData.savedTopics[0]);
    });

    test('completed topics should persist between being serialized and deserialized', () => {
        const completedTopic = aString();
        const persistedData = new PersistedUserDataBuilder().addCompletedTopic(completedTopic).buildObject();
        const recreatedData = deserializePersistedData(serializePersistedData(persistedData));
        expect(completedTopic).toEqual(recreatedData.completedTopics[0]);
    });
});

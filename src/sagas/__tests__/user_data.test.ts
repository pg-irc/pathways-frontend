// tslint:disable:no-expression-statement no-trailing-whitespace

import { PersistedUserDataBuilder } from '../../stores/__tests__/helpers/user_data_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { serializePersistedData, deserializePersistedData } from '../user_data';

describe('persisted user_data tests', () => {
        
    test('chosen answer should persist between being serialized and deserialized', () => {
        const persistedData = new PersistedUserDataBuilder().addChosenAnswer(aString()).buildObject();
        expect(persistedData).toEqual(deserializePersistedData(serializePersistedData(persistedData)));
    });
        
    test('saved topics should persist between being serialized and deserialized', () => {
        const persistedData = new PersistedUserDataBuilder().addSavedTopic(aString()).buildObject();
        expect(persistedData).toEqual(deserializePersistedData(serializePersistedData(persistedData)));
    });

    test('completed topics should persist between being serialized and deserialized', () => {
        const persistedData = new PersistedUserDataBuilder().addChosenAnswer(aString()).buildObject();
        expect(persistedData).toEqual(deserializePersistedData(serializePersistedData(persistedData)));
    });
});

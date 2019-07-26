// tslint:disable:no-expression-statement no-trailing-whitespace

import { PersistedUserDataBuilder } from '../../stores/__tests__/helpers/user_data_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { serialize, deserialize } from '../user_data';

describe('persistent user_data tests', () => {
        
    test('chosen answer should persist between being serialized and deserialized', () => {
        const persistentData = new PersistedUserDataBuilder().addChosenAnswer(aString()).buildObject();
        expect(persistentData).toEqual(deserialize(serialize(persistentData)));
    });
        
    test('saved topics should persist between being serialized and deserialized', () => {
        const persistentData = new PersistedUserDataBuilder().addSavedTopic(aString()).buildObject();
        expect(persistentData).toEqual(deserialize(serialize(persistentData)));
    });

    test('completed topics should persist between being serialized and deserialized', () => {
        const persistentData = new PersistedUserDataBuilder().addChosenAnswer(aString()).buildObject();
        expect(persistentData).toEqual(deserialize(serialize(persistentData)));
    });
});

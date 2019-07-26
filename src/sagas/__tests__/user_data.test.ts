import { PersistedUserDataBuilder } from '../../stores/__tests__/helpers/user_data_helpers';
import { aString } from '../../application/__tests__/helpers/random_test_values';
import { serialize, deserialize } from '../user_data';

describe('persistent user_data tests', () => {
        
    test('chosen answer should persist between being serialized and deserialized', () => {
        const chosenAnswer = aString();
        const persistentData = new PersistedUserDataBuilder();
        persistentData.addChosenAnswer(chosenAnswer);
        const userDataObject = persistentData.buildObject();
        const userDataString = persistentData.buildJson();
        const serializedUserData = serialize(userDataObject);
        expect(serializedUserData).toEqual(userDataString);
        const deserializedUserData = deserialize(serializedUserData);
        expect(deserializedUserData).toEqual(userDataObject);
    });
        
    test('saved topics should persist between being serialized and deserialized', () => {
        const savedTopics = aString();
        const persistent_data = new PersistedUserDataBuilder();
        persistent_data.addSavedTask(savedTopics);
        const userDataObject = persistent_data.buildObject();
        const userDataString = persistent_data.buildJson();
        const serializedUserData = serialize(userDataObject);
        expect(serializedUserData).toEqual(userDataString);
        const deserializedUserData = deserialize(serializedUserData);
        expect(deserializedUserData).toEqual(userDataObject);
    });

    test('completed topics should persist between being serialized and deserialized', () => {
        const completedTopics = aString();
        const persistent_data = new PersistedUserDataBuilder();
        persistent_data.addCompletedTask(completedTopics);
        const userDataObject = persistent_data.buildObject();
        const userDataString = persistent_data.buildJson();
        const serializedUserData = serialize(userDataObject);
        expect(serializedUserData).toEqual(userDataString);
        const deserializedUserData = deserialize(serializedUserData);
        expect(deserializedUserData).toEqual(userDataObject);
    });
});

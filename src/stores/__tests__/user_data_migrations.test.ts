// tslint:disable:no-expression-statement
import { manyStrings, aBoolean } from '../../application/__tests__/helpers/random_test_values';
import { PersistedUserData, migrateUserData } from '../user_data';
import {
    PersistedUserDataVersion1, migrateFromVersion1,
    PersistedUserDataVersion2, migrateFromVersion2,
} from '../user_data/legacy_data/legacy_types';

describe('user data migration', () => {
    const chosenAnswers = manyStrings();
    const savedTasks = manyStrings();
    const completedTasks = manyStrings();

    describe('stepwise', () => {

        test('from version 1 to 2', () => {
            const version1data: PersistedUserDataVersion1 = {
                version: 'version1',
                chosenAnswers,
                savedTasks,
                completedTasks,
            };
            const expectedVersion2data: PersistedUserDataVersion2 = {
                version: 'version2',
                chosenAnswers,
                savedTasks,
                completedTasks,
                newProp: false,
            };

            const result = migrateFromVersion1(version1data);

            expect(result).toEqual(expectedVersion2data);
        });

        test('from version 2 to 3', () => {
            const prop = aBoolean();

            const version2data: PersistedUserDataVersion2 = {
                version: 'version2',
                chosenAnswers,
                savedTasks,
                completedTasks,
                newProp: prop,
            };
            const expectedVersion3data: PersistedUserData = {
                version: 'version3',
                chosenAnswers,
                savedTasks,
                completedTasks,
                newProp: prop,
                secondNewProp: false,
            };

            const result = migrateFromVersion2(version2data);

            expect(result).toEqual(expectedVersion3data);
        });
    });
    test('from first to current version', () => {
        const version1data: PersistedUserDataVersion1 = {
            version: 'version1',
            chosenAnswers,
            savedTasks,
            completedTasks,
        };
        const expectedData: PersistedUserData = {
            version: 'version3',
            chosenAnswers,
            savedTasks,
            completedTasks,
            newProp: false,
            secondNewProp: false,
        };

        const result = migrateUserData(version1data);

        expect(result).toEqual(expectedData);
    });
});

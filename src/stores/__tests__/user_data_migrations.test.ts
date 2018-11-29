// tslint:disable:no-expression-statement
import { manyStrings } from '../../application/__tests__/helpers/random_test_values';
import { PersistedUserData, migrateUserData } from '../user_data';
import {
    PersistedUserDataVersion1, migrateFromVersion_0_1,
    PersistedUserDataVersion2, migrateFromVersion_0_2,
} from '../user_data/legacy_data/legacy_types';

describe('user data migration', () => {
    const chosenAnswers = manyStrings();
    const savedTasks = manyStrings();

    describe('stepwise', () => {

        test('from version 0.1 to 0.2', () => {
            const oldData: PersistedUserDataVersion1 = {
                version: 'version 0.1',
                chosenAnswers,
            };
            const expectedNewData: PersistedUserDataVersion2 = {
                version: 'version 0.2',
                chosenAnswers,
                savedTasks: [],
            };

            const result = migrateFromVersion_0_1(oldData);

            expect(result).toEqual(expectedNewData);
        });

        test('from version 0.2 to 1.0', () => {
            const oldData: PersistedUserDataVersion2 = {
                version: 'version 0.2',
                chosenAnswers,
                savedTasks,
            };
            const expectedNewData: PersistedUserData = {
                version: 'version 1.0',
                chosenAnswers,
                savedTasks,
                completedTasks: [],
            };

            const result = migrateFromVersion_0_2(oldData);

            expect(result).toEqual(expectedNewData);
        });
    });
    test('from first to current version', () => {
        const oldData: PersistedUserDataVersion1 = {
            version: 'version 0.1',
            chosenAnswers,
        };
        const expectedNewData: PersistedUserData = {
            version: 'version 1.0',
            chosenAnswers,
            savedTasks: [],
            completedTasks: [],
        };

        const result = migrateUserData(oldData);

        expect(result).toEqual(expectedNewData);
    });
});

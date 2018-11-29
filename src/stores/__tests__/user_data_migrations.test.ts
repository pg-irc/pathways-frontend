// tslint:disable:no-expression-statement
import { manyStrings } from '../../application/__tests__/helpers/random_test_values';
import { PersistedUserData, migrateToCurrentUserDataFormat } from '../user_data';
import {
    PersistedUserData_v0_1, migrateFrom_v0_1,
    PersistedUserData_v0_2, migrateFrom_v0_2,
} from '../user_data/legacy_data/legacy_types';

describe('user data migration', () => {
    const chosenAnswers = manyStrings();
    const savedTasks = manyStrings();

    describe('stepwise', () => {

        test('from version 0.1 to 0.2', () => {
            const oldData: PersistedUserData_v0_1 = {
                version: 'version 0.1',
                chosenAnswers,
            };
            const expectedNewData: PersistedUserData_v0_2 = {
                version: 'version 0.2',
                chosenAnswers,
                savedTasks: [],
            };

            const result = migrateFrom_v0_1(oldData);

            expect(result).toEqual(expectedNewData);
        });

        test('from version 0.2 to 1.0', () => {
            const oldData: PersistedUserData_v0_2 = {
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

            const result = migrateFrom_v0_2(oldData);

            expect(result).toEqual(expectedNewData);
        });
    });
    test('from first to current version', () => {
        const oldData: PersistedUserData_v0_1 = {
            version: 'version 0.1',
            chosenAnswers,
        };
        const expectedNewData: PersistedUserData = {
            version: 'version 1.0',
            chosenAnswers,
            savedTasks: [],
            completedTasks: [],
        };

        const result = migrateToCurrentUserDataFormat(oldData);

        expect(result).toEqual(expectedNewData);
    });
});

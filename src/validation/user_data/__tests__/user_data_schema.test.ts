// tslint:disable:no-expression-statement no-any no-null-keyword
import { PersistedUserDataBuilder } from '../../../stores/__tests__/helpers/user_data_helpers';
import { validateUserData } from '..';
import { aString, aBoolean } from '../../../helpers/random_test_values';
import { ServiceBuilder, buildServiceMap } from '../../../stores/__tests__/helpers/services_helpers';
import { buildDefaultStore, Store } from '../../../stores';
import { selectUserDataForLocalPersistence } from '../../../selectors/user_data/select_user_data_for_local_persistence';
import { UserDataPersistence } from '../../../stores/user_data';
import * as constants from '../../../application/constants';
import { reducer } from '../../../stores';

describe('user data schema', () => {

    describe('with valid data', () => {

        test('passes on valid user data object', () => {
            const validUserData = new PersistedUserDataBuilder().buildObject();
            const validator = validateUserData(validUserData);
            expect(validator.isValid).toBe(true);
        });

        test('passes on empty user data object', () => {
            const validator = validateUserData({});
            expect(validator.isValid).toBe(true);
        });

        test('passes when it is consistent with the user data saved on disk', () => {
            const appStore: Store = buildDefaultStore();
            const userDataInDeviceStorage = new PersistedUserDataBuilder().buildObject();
            const action: UserDataPersistence.LoadSuccessAction = {
                type: constants.LOAD_USER_DATA_SUCCESS,
                payload:  userDataInDeviceStorage,
            };
            const appStoreState = reducer(appStore, action);
            const userDataFromStore = selectUserDataForLocalPersistence(appStoreState);
            // If this test fails we have made a change that may not allow us to restore user data from disk.
            const validator = validateUserData(userDataFromStore);
            expect(validator.isValid).toBe(true);
        });
    });

    describe('with invalid data', () => {

        test('fails on user data that is not of type object', () => {
            const validator = validateUserData([]);
            expect(validator.isValid).toBe(false);
        });
    });

    describe('validating user data properties', () => {

        describe('the chosenAnswers property', () => {

                test('passes with valid data', () => {
                    const answerId = aString();
                    const validUserData = new PersistedUserDataBuilder().addChosenAnswer(answerId).buildObject();
                    const validator = validateUserData(validUserData);
                    expect(validator.isValid).toBe(true);
                });

                test('fails with invalid data,', () => {
                    const answerId: any = null;
                    const invalidUserData = new PersistedUserDataBuilder().addChosenAnswer(answerId).buildObject();
                    const validator = validateUserData(invalidUserData);
                    expect(validator.isValid).toBe(false);
                });
            });

        describe('the saved topics property', () => {

            test('passes with valid data', () => {
                const topicId = aString();
                const validUserData = new PersistedUserDataBuilder().addSavedTopic(topicId).buildObject();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const topicId: any = null;
                const invalidUserData = new PersistedUserDataBuilder().addSavedTopic(topicId).buildObject();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the completed topics property', () => {

            test('passes with valid data', () => {
                const topicId = aString();
                const validUserData = new PersistedUserDataBuilder().addCompletedTopic(topicId).buildObject();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const topicId: any = null;
                const invalidUserData = new PersistedUserDataBuilder().addCompletedTopic(topicId).buildObject();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the showOnboarding property', () => {

            test('passes with valid data', () => {
                const showOnboarding = aBoolean();
                const validUserData = new PersistedUserDataBuilder().addShowOnboarding(showOnboarding).buildObject();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const showOnboarding: any = null;
                const invalidUserData = new PersistedUserDataBuilder().addShowOnboarding(showOnboarding).buildObject();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the saved service property', () => {

            test('passes with valid data', () => {
                const aServiceBuilder = new ServiceBuilder();
                const serviceMap = buildServiceMap([aServiceBuilder]);
                const validUserData = new PersistedUserDataBuilder().addBookmarkedServices(serviceMap).buildObject();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails when required properties are missing', () => {
                const serviceId = aString();
                const invalidService: any = {
                    id: serviceId,
                    // name: aString(),
                    // description: aString(),
                    // phoneNumbers: [],
                    // addresses: [],
                    // website: aString(),
                    // email: aString(),
                    // organizationName: aString(),
                    // bookmarked: aBoolean(),
                };
                const invalidServiceMap: any = { serviceId: invalidService };
                const invalidUserData = new PersistedUserDataBuilder().addBookmarkedServices(invalidServiceMap).buildObject();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });
    });
});
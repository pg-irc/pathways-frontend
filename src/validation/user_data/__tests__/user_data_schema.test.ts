// tslint:disable:no-expression-statement no-any no-null-keyword
import { PersistedDataBuilder } from '../../../stores/__tests__/helpers/persisted_data_builder';
import { validateUserData } from '..';
import { aString, aBoolean, aNumber } from '../../../application/helpers/random_test_values';
import { HumanServiceDataBuilder, buildServiceMap } from '../../../stores/__tests__/helpers/services_helpers';
import { buildDefaultStore, Store } from '../../../stores';
import { selectUserDataForLocalPersistence } from '../../../selectors/user_data/select_user_data_for_local_persistence';
import { DataPersistence } from '../../../stores/persisted_data';
import * as constants from '../../../application/constants';
import { reducer } from '../../../stores';
import { SearchServiceData } from '../../search/types';
import { anAddress, anOrganization, aGeoLocation } from '../../search/__tests__/helpers/search_schema';

describe('user data schema', () => {

    describe('with valid data', () => {

        test('passes on valid user data object', () => {
            const validUserData = new PersistedDataBuilder().build();
            const validator = validateUserData(validUserData);
            expect(validator.isValid).toBe(true);
        });

        test('passes on empty user data object', () => {
            const validator = validateUserData({});
            expect(validator.isValid).toBe(true);
        });

        test('passes when it is consistent with the user data saved on disk', () => {
            const appStore: Store = buildDefaultStore();
            const userDataInDeviceStorage = new PersistedDataBuilder().build();
            const action: DataPersistence.LoadSuccessAction = {
                type: constants.LOAD_USER_DATA_SUCCESS,
                payload: userDataInDeviceStorage,
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
                const validUserData = new PersistedDataBuilder().withChosenAnswer(answerId).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data,', () => {
                const answerId: any = null;
                const invalidUserData = new PersistedDataBuilder().withChosenAnswer(answerId).build();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the saved topics property', () => {

            test('passes with valid data', () => {
                const topicId = aString();
                const validUserData = new PersistedDataBuilder().withBookmarkedTopic(topicId).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const topicId: any = null;
                const invalidUserData = new PersistedDataBuilder().withBookmarkedTopic(topicId).build();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the showOnboarding property', () => {

            test('passes with valid data', () => {
                const showOnboarding = aBoolean();
                const validUserData = new PersistedDataBuilder().withShowOnboarding(showOnboarding).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const showOnboarding: any = null;
                const invalidUserData = new PersistedDataBuilder().withShowOnboarding(showOnboarding).build();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the saved service property', () => {

            test('passes with valid data', () => {
                const aServiceBuilder = new HumanServiceDataBuilder();
                const serviceMap = buildServiceMap([aServiceBuilder]);
                const validUserData = new PersistedDataBuilder().withBookmarkedServices(serviceMap).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails when required properties are missing', () => {
                const serviceId = aString();
                const invalidService: any = {
                    id: serviceId,
                    // name: aString(),
                    description: aString(),
                    phoneNumbers: [],
                    addresses: [],
                    website: aString(),
                    email: aString(),
                    organizationName: aString(),
                    bookmarked: aBoolean(),
                };
                const invalidServiceMap: any = { serviceId: invalidService };
                const invalidUserData = new PersistedDataBuilder().withBookmarkedServices(invalidServiceMap).build();
                const validator = validateUserData(invalidUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the showPartialLocalizationMessage property', () => {

            test('passes with valid data', () => {
                const showPartialLocalizationMessage = aBoolean();
                const validUserData = new PersistedDataBuilder().withShowPartialLocalizationMessage(showPartialLocalizationMessage).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const showPartialLocalizationMessage: any = null;
                const validUserData = new PersistedDataBuilder().withShowPartialLocalizationMessage(showPartialLocalizationMessage).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('the disableAnalytics property', () => {

            test('passes with valid data', () => {
                const disableAnalytics = aBoolean();
                const validUserData = new PersistedDataBuilder().withDisableAnalytics(disableAnalytics).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with valid data', () => {
                const disableAnalytics: any = null;
                const validUserData = new PersistedDataBuilder().withDisableAnalytics(disableAnalytics).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('searchTerm property', () => {

            test('passes with valid data', () => {
                const searchTerm = aString();
                const validUserData = new PersistedDataBuilder().withSearchTerm(searchTerm).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const searchTerm: any = null;
                const validUserData = new PersistedDataBuilder().withSearchTerm(searchTerm).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('searchLocation property', () => {

            test('passes with valid data', () => {
                const searchLocation = aString();
                const validUserData = new PersistedDataBuilder().withSearchLocation(searchLocation).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const searchLocation: any = null;
                const validUserData = new PersistedDataBuilder().withSearchLocation(searchLocation).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('searchLatLong property', () => {

            test('passes with valid data', () => {
                const searchLatLong = {
                    lat: aNumber(),
                    lng: aNumber(),
                };
                const validUserData = new PersistedDataBuilder().withSearchLatLong(searchLatLong).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const searchLatLong: any = aString();
                const validUserData = new PersistedDataBuilder().withSearchLatLong(searchLatLong).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(false);
            });
        });

        describe('searchResults property', () => {

            test('passes with valid data', () => {
                const searchResults: ReadonlyArray<SearchServiceData> = [{
                    type: 'SearchServiceData',
                    service_name: aString(),
                    service_id: aString(),
                    service_description: aString(),
                    address: anAddress(),
                    organization: anOrganization(),
                    _geoloc: aGeoLocation(),
                    email: aString(),
                }];
                const validUserData = new PersistedDataBuilder().withSearchResults(searchResults).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(true);
            });

            test('fails with invalid data', () => {
                const searchResults: any = null;
                const validUserData = new PersistedDataBuilder().withSearchResults(searchResults).build();
                const validator = validateUserData(validUserData);
                expect(validator.isValid).toBe(false);
            });
        });
    });
});
